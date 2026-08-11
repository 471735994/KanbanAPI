using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        // 定义命令
        public class Command : IRequest<string>
        {
            public required string Id { get; set; }
        }

        // 定义处理器
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            // 处理命令
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = context.Activities.Find(request.Id); //查找活动
                if (activity == null)
                {
                    return "Activity not found";
                }
                context.Activities.Remove(activity);
                await context.SaveChangesAsync(cancellationToken); //保存更改
                return activity.Id;
            }
        }
    }
}
