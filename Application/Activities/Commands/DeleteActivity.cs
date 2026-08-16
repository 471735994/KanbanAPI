using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        // 定义命令
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        // 定义处理器
        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            // 处理命令
            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var activity = await context.Activities.FindAsync(request.Id); //查找活动
                if (activity == null)
                {
                    return Result<Unit>.Failure("Activity not found", 404);
                }
                context.Remove(activity);
                var result = await context.SaveChangesAsync(cancellationToken) > 0; //保存更改,如果大于0则成功
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete activity", 400);
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
