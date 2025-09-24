using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BE.Data;
using BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


[ApiController]
[Route("api/auth")]
public class AuthController : Controller{
    private readonly ShopDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(ShopDbContext context, IConfiguration config){
        _config = config;
        _context = context;
    }

    //API đăng nhập
    [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            // ❌ Không cần hash lại request.Password ở đây

            // ✅ Chỉ kiểm tra user tồn tại và password khớp
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized(new { title = "Sai tên đăng nhập hoặc mật khẩu" });

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token, User = user });
        }
    

    //Phương thức tạo token
    private String GenerateJwtToken(User user)
    {
        var jwtKey = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT key chưa được cấu hình");
        var securityKey = new
            SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]{
            new Claim(JwtRegisteredClaimNames.Sub,
                user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };
        Console.WriteLine("----- Claims: " + String.Join(", ", claims.Select(c => c.Type + ": " + c.Value)));
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_config["Jwt:ExpiryInMinutes"])),
            signingCredentials: credentials
        );

        // Console.WriteLine("Issuer: " + _config["Jwt:Issuer"]);
        // Console.WriteLine("Audience: " + _config["Jwt:Audience"]);
        // Console.WriteLine("ExpiryInMinutes: " + _config["Jwt:ExpiryInMinutes"]);

        return new JwtSecurityTokenHandler()
                    .WriteToken(token);

    }
}

public class LoginRequest
{
    public String Username { get; set; }
    public String Password { get; set; }
}
