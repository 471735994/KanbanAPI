using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Queries.Commands
{
    public class CreateActivity
    {
        // 定义命令
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDto ActivityDto { get; set; }
        }

        // 定义处理器
        public class Handler(AppDbContext context, IMapper mapper)
            : IRequestHandler<Command, Result<string>>
        {
            // 处理命令
            public async Task<Result<string>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var activity = mapper.Map<Activity>(request.ActivityDto); // 获取活动

                context.Activities.Add(activity); // 添加活动
                var result = await context.SaveChangesAsync(cancellationToken) > 0; // 保存更改
                if (!result)
                    return Result<string>.Failure("Failed to create activity", 400); // 如果保存失败，返回失败结果
                return Result<string>.Success(activity.Id); // 返回活动Id
            }
        }
    }
}
