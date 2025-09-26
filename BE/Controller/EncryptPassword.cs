using Microsoft.AspNetCore.Mvc;

namespace MYWEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncryptPasswordController : ControllerBase
    {
        [HttpGet("{plainTextPassword}")]
        public IActionResult Encrypt(string plainTextPassword)
        {
            if (string.IsNullOrWhiteSpace(plainTextPassword))
                return BadRequest("Password is required.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(plainTextPassword);
            return Ok(new { HashedPassword = hashedPassword });
        }
    }
}