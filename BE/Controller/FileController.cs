using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/files")]
public class FileController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    public FileController(IWebHostEnvironment env)
    {
        _env = env;
    }

    public class UploadImageRequest
{
    public IFormFile file { get; set; }
}

[HttpPost("upload")]
[Consumes("multipart/form-data")]
public async Task<IActionResult> UploadImage([FromForm] UploadImageRequest req)
{
    var file = req.file;
    if (file == null || file.Length == 0)
        return BadRequest("Không có tệp nào được tải lên.");

    var uploadPath = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");
    Directory.CreateDirectory(uploadPath);

    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
    var filePath = Path.Combine(uploadPath, fileName);

    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);

    var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
    return Ok(new { imageUrl = fileUrl });
}

}