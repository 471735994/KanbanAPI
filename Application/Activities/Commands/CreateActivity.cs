using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries.Commands
{
    public class CreateActivity
    {
        // 定义命令
        public class Command : IRequest<string>
        {
            public required CreateActivityDto ActivityDto { get; set; }
        }

        // 定义处理器
        public class Handler(AppDbContext context, IMapper mapper)
            : IRequestHandler<Command, string>
        {
            // 处理命令
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                // 创建活动
                var activity = mapper.Map<Activity>(request.ActivityDto); // 获取活动

                context.Activities.Add(activity); // 添加活动
                await context.SaveChangesAsync(cancellationToken); // 保存更改
                return activity.Id; // 返回活动Id
            }
        }
    }
}
