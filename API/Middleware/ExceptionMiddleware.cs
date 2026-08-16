using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        //创建一个字典来存储验证错误
        var validationErrors = new Dictionary<string, string[]>();
        //将验证错误添加到字典中
        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                //如果字典中已经存在该属性名的错误，则添加到数组中
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    //将错误信息添加到数组中
                    validationErrors[error.PropertyName] = existingErrors
                        .Append(error.ErrorMessage)
                        .ToArray();
                }
                else
                {
                    //如果字典中不存在该属性名的错误，则创建新数组
                    validationErrors[error.PropertyName] = new[] { error.ErrorMessage };
                }
            }
        }
        //设置响应状态码为400
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        //设置响应内容类型为application/json
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation error",
            Detail = "One or more validation errors occurred",
        };
        //将验证错误信息写入响应
        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
