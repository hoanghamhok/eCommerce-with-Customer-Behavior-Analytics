using Microsoft.AspNetCore.Mvc;
using BE.Models.DTOs;
[ApiController]
[Route("api/files")]
public class FileController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    public FileController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadImage([FromForm] FileUploadDto dto)
    {
        var file = dto.File;
        Console.WriteLine("WebRootPath: " + _env.WebRootPath);
        if (file == null || file.Length == 0)
            return BadRequest("Không có tệp nào được tải lên.");

        // Đường dẫn thư mục tải lên (wwwroot/uploads)
        var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        //Tạo tên tệp duy nhất
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadPath, fileName);

        // Lưu tệp vào thư mục
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Trả về URL của tệp đã tải lên
        var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
        return Ok(new { imageUrl = fileUrl });
    }

}