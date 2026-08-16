using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Activities.Queries.Commands;
using FluentValidation;

namespace Application.Activities.Validators
{
    public class CreateActivityValidator
        : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
    {
        public CreateActivityValidator()
            : base(x => x.ActivityDto) { }
    }
}
