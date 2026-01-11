namespace Api.Services;
using Api.Dtos;
public interface ITokenService
{
    string GenerateToken(AuthenticatedUserDto user, IEnumerable<string>? roles = null);
}
