using Api.Dtos;
namespace Api.Services;

public interface IUserService
{

    Task<UsersDto> CreateLoginAsync(UsersDto input, CancellationToken ct);

    Task<AuthenticatedUserDto> GetLoginAsync(LoginDto input, CancellationToken ct);

  


}