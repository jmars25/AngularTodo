namespace Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Api.Services;
using Api.Dtos;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]


public class TodoController : ControllerBase
{

    private readonly ITodoService _service;

    public TodoController(ITodoService service) => _service = service;

    [HttpGet]

    public async Task<IActionResult> GetTodos(CancellationToken ct)
        => Ok(await _service.GetTodosAsync(ct));

    [HttpPost("AddTodo")]
    public async Task<ActionResult<TodoDto>> CreateTodo(
        [FromBody] CreateTodoDto dto,
        CancellationToken ct)
    {
        var created = await _service.CreateTodoAsync(dto, ct);
        return CreatedAtAction(nameof(GetTodos), new { id = created.TodoID }, created);
    }



    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTodo(
        int id,
        CancellationToken ct)
    {
        var dto = new DeleteTodoDto(id);
        var deleted = await _service.DeleteTodoAsync(dto, ct);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPost("UpdateTodo")]
    public async Task<ActionResult<TodoDto>> UpdateTodo(
        [FromBody] UpdateTodoDto dto,
        CancellationToken ct)
    {

        var TodoUpdated = await _service.UpdateTodoAsync(dto, ct);

        if (!TodoUpdated)
        {
            
            return NotFound();
        }
        return NoContent();


    }

}
