namespace Api.Dtos;


public record TodoDto(int TodoID, int UserID, string Title, string Description, bool IsCompleted, DateTime?  DueDate);