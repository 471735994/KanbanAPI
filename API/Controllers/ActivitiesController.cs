using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Activities.Queries.Commands;
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
        var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });
        if (activity == null)
            return NotFound();
        return activity;
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        var command = new CreateActivity.Command { Activity = activity };
        var activityId = await Mediator.Send(command);
        return Ok(activityId);
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        var command = new EditActivity.Command { Activity = activity };
        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var command = new DeleteActivity.Command { Id = id };
        await Mediator.Send(command);
        return NoContent();
    }
}
