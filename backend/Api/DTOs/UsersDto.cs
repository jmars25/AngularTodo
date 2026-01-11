namespace Api.Dtos;

public record UsersDto( string Username, string Password);


public record LoginDto(string Username, string Password);


public record AuthenticatedUserDto(int UserId, string Username);