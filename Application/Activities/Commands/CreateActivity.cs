using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
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
            public required Activity Activity { get; set; }
        }

        // 定义处理器
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            // 处理命令
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                // 创建活动
                var activity = request.Activity; // 获取活动
                activity.Id = Guid.NewGuid().ToString(); // 生成新的Id
                context.Activities.Add(activity); // 添加活动
                await context.SaveChangesAsync(cancellationToken); // 保存更改
                return activity.Id; // 返回活动Id
            }
        }
    }
}
