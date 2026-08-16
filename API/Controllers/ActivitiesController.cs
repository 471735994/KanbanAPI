using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Activities.Queries.Commands;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // throw new Exception("Sever test error");

        var result = await Mediator.Send(new GetActivityDetails.Query { Id = id });
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activity)
    {
        var command = new CreateActivity.Command { ActivityDto = activity };
        var activityId = await Mediator.Send(command);
        return HandleResult(activityId);
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        var command = new EditActivity.Command { ActivityDto = activity };
        var result = await Mediator.Send(command);
        return HandleResult(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var command = new DeleteActivity.Command { Id = id };
        var result = await Mediator.Send(command);
        return HandleResult(result);
    }
}
