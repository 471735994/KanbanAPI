using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();//跨域

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();//注册MediatR
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));//添加验证行为
});


builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfiles)); //添加AutoMapper
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();//添加FluentValidation
builder.Services.AddTransient<ExceptionMiddleware>();//添加异常处理中间件

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();//使用异常处理中间件
app.UseCors(x =>
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://localhost:3000")
);

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
