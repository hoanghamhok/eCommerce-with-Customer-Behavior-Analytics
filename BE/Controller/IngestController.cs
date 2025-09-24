using BE.Data;
using BE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;


[ApiController]
[Route("ingest")]
public class IngestController : ControllerBase
{
    private readonly ShopDbContext _db;
    public IngestController(ShopDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] EventIngestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) || (dto.AnonId is null && dto.UserId is null))
            return BadRequest();

        var ev = new EventRaw
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Ts = dto.Ts == default ? DateTime.UtcNow : dto.Ts.ToUniversalTime(),
            AnonId = dto.AnonId,
            UserId = dto.UserId,
            Url = dto.Url,
            Referrer = dto.Referrer,
            Ua = dto.Ua,
            PropsJson = JsonSerializer.Serialize(dto.Props ?? new()),
            CreatedAt = DateTime.UtcNow
        };
        _db.EventRaws.Add(ev);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }
    public sealed class EventIngestDto {
        public required string Name { get; set; } // "view_product", ...
        public DateTime Ts { get; set; }
        public string? AnonId { get; set; }
        public string? UserId { get; set; }
        public string Url { get; set; } = "";
        public string? Referrer { get; set; }
        public string? Ua { get; set; }
        public Dictionary<string, object>? Props { get; set; }
}
}
