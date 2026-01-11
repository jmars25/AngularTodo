namespace Api.Services;

using Api.Dtos;
using System.Threading;

public interface ITodoService
{
    Task<IReadOnlyList<TodoDto>> GetTodosAsync(CancellationToken ct);
     Task<TodoDto> CreateTodoAsync(CreateTodoDto todo, CancellationToken ct); 
}