namespace Api.Services;

using Api.Dtos;
using Api.Models;
using Microsoft.EntityFrameworkCore;


public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db) => _db = db;

    public async Task<UsersDto> CreateLoginAsync(UsersDto input, CancellationToken ct)
    {
       
        var existingUser = await _db.Users
            .FirstOrDefaultAsync(u => u.UserName == input.Username.Trim(), ct);

        if (existingUser != null)
        {
            throw new InvalidOperationException("Username already exists");
        }

        // Hash the password using BCrypt
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(input.Password);

        var entity = new Users
        {
        
            UserName = input.Username.Trim(),
            PasswordHash = hashedPassword,  
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(entity);
        await _db.SaveChangesAsync(ct);

        
        return new UsersDto(entity.UserName, string.Empty);
    }

     public async Task<AuthenticatedUserDto> GetLoginAsync(LoginDto input, CancellationToken ct)
  {
    
      var user = await _db.Users
          .FirstOrDefaultAsync(u => u.UserName == input.Username.Trim(), ct);


    
      if (user == null)
      {
          throw new InvalidOperationException("Invalid credentials");
      }

   
      bool isPasswordValid = BCrypt.Net.BCrypt.Verify(input.Password, user.PasswordHash);

      if (!isPasswordValid)
      {
          throw new InvalidOperationException("Invalid credentials");
      }
       
      return new AuthenticatedUserDto(user.UserID, user.UserName);
  }

}



