using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build(); //创建授权策略,要求用户已认证
    opt.Filters.Add(new AuthorizeFilter(policy)); //添加授权过滤器,要求所有控制器都需要认证
});
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(); //跨域

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>(); //注册MediatR
    x.AddOpenBehavior(typeof(ValidationBehavior<,>)); //添加验证行为
});

builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfiles)); //添加AutoMapper
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>(); //添加FluentValidation
builder.Services.AddTransient<ExceptionMiddleware>(); //添加异常处理中间件
builder
    .Services.AddIdentityApiEndpoints<User>(options =>
    {
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>(); //添加Identity

// 构建应用
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>(); //使用异常处理中间件
app.UseCors(x =>
    x.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials() //允许携带凭证
        .WithOrigins("http://localhost:3000", "https://localhost:3000")
);
app.UseAuthentication(); //使用认证
app.UseAuthorization(); //使用授权

app.MapControllers(); //映射控制器
app.MapGroup("api").MapIdentityApi<User>(); //映射Identity API

//创建作用域,用于获取服务,在应用程序结束时释放,用于初始化数据库,在应用程序启动时执行,在应用程序结束时释放。
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider; //获取服务
try
{
    var context = services.GetRequiredService<AppDbContext>(); //获取数据库上下文
    var userManager = services.GetRequiredService<UserManager<User>>(); //获取用户管理器
    await context.Database.MigrateAsync(); //迁移数据库
    await DbInitializer.SeedData(context, userManager); //初始化数据
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>(); //获取日志
    logger.LogError(ex, "An error occurred during migration"); //记录日志
}

app.Run();
