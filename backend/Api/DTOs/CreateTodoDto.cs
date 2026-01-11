namespace Api.Dtos;


public record CreateTodoDto(int UserID, string Title, string Description, DateTime? DueDate);