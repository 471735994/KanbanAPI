using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Metadata;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(
                    [request.Activity.Id],
                    cancellationToken
                );
                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }
                // activity.Title = request.Activity.Title;
                // activity.Description = request.Activity.Description;
                // activity.Category = request.Activity.Category;
                // activity.Date = request.Activity.Date;
                // activity.City = request.Activity.City;
                // activity.Venue = request.Activity.Venue;
                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
