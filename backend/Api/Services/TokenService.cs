using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Dtos;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
namespace Api.Services;

public sealed class JwtOptions
{
    public string Issuer { get; init; } = "";
    public string Audience { get; init; } = "";
    public string Key { get; init; } = "";
}

public sealed class TokenService : ITokenService
{

    private readonly JwtOptions _opts;
    private readonly byte[] _keyBytes;


    public TokenService(IOptions<JwtOptions> opts)
    {
        _opts = opts.Value;
        _keyBytes = Encoding.UTF8.GetBytes(_opts.Key);
    }


        public string GenerateToken(AuthenticatedUserDto user, IEnumerable<string>? roles = null)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Username),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("userId", user.UserId.ToString()) 
        };

        if (roles != null)
        {
            foreach (var r in roles)
                claims.Add(new(ClaimTypes.Role, r));
        }

        var creds = new SigningCredentials(
            new SymmetricSecurityKey(_keyBytes),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _opts.Issuer,
            audience: _opts.Audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(60),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


}