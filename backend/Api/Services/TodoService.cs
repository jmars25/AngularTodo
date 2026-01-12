namespace Api.Services;

using System.Data.Common;
using Api.Dtos;
using Api.Models;
using Microsoft.EntityFrameworkCore;


public class TodoService : ITodoService
{

    private readonly AppDbContext _db;

    public TodoService(AppDbContext db) => _db = db;

    public async Task<IReadOnlyList<TodoDto>> GetTodosAsync(CancellationToken ct)
    {

        return await _db.Todos

        .Select(c => new TodoDto(c.TodoID, c.UserID, c.Title, c.Description, c.IsCompleted, c.DueDate))
        .ToListAsync(ct);

    }

    public async Task<TodoDto> CreateTodoAsync(CreateTodoDto todo, CancellationToken ct)
    {

        var entity = new Todos
        {
            UserID = todo.UserID,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = false,
            DueDate = todo.DueDate


        };


        _db.Todos.Add(entity);
        await _db.SaveChangesAsync(ct);

        return new TodoDto(
       entity.TodoID,
       entity.UserID,
       entity.Title,
       entity.Description,
       entity.IsCompleted,
       entity.DueDate);
    }

    public async Task<bool> DeleteTodoAsync(DeleteTodoDto todo, CancellationToken ct)
    {

      var rowsAffected = await _db.Todos
        .Where(t => t.TodoID == todo.TodoID)
        .ExecuteDeleteAsync();

        return rowsAffected > 0;

    }

    public async Task<bool> UpdateTodoAsync(UpdateTodoDto dto, CancellationToken ct)
    {
        var rowsAffected = await _db.Todos
            .Where(t => t.TodoID == dto.TodoID)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(t => t.IsCompleted, dto.IsCompleted) 
            , ct);

        return rowsAffected > 0;
    }

}




