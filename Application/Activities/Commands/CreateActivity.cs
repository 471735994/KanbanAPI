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
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = request.Activity;
                activity.Id = Guid.NewGuid().ToString();
                context.Activities.Add(activity);
                await context.SaveChangesAsync(cancellationToken);
                return activity.Id;
            }
        }
    }
}