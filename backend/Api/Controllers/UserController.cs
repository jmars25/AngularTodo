using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;
    private readonly ITokenService _tokenService;

    public UserController(IUserService service, ITokenService tokenService)
    {
        _service = service;
        _tokenService = tokenService;
    }



    [HttpPost("login")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login([FromBody] LoginDto input, CancellationToken ct)
    {
        // Call UserService to verify credentials
        var user = await _service.GetLoginAsync(input, ct);

        // Call TokenService to generate JWT
        var token = _tokenService.GenerateToken(user);

        // Return token to client
        return Ok(new { token });
    }

    [HttpPost("CreateLogin")]
    public async Task<ActionResult<UsersDto>> CreateLoginAsync(
        [FromBody] UsersDto dto,
        CancellationToken ct)
    {
        var created = await _service.CreateLoginAsync(dto, ct);
        return Created("api/User/CreateLogin", created);
    }








}

