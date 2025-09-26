using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class EventRaw
    {
        public Guid Id { get; set; }
        [MaxLength(64)] public string Name { get; set; } = default!;
        public DateTime Ts { get; set; }
        [MaxLength(64)] public string? AnonId { get; set; }
        [MaxLength(64)] public string? UserId { get; set; }
        [MaxLength(2048)] public string? Url { get; set; }
        [MaxLength(2048)] public string? Referrer { get; set; }
        [MaxLength(512)] public string? Ua { get; set; }
        public string? PropsJson { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    public class UserFeature
    {
        [Key, MaxLength(64)] public string UserId { get; set; } = default!;
        public int? RecencyDays { get; set; }
        public int? Frequency { get; set; }
        public decimal? Monetary { get; set; }
        public DateTime LastComputedAt { get; set; }
    }

    public class UserRecommendation
    {
        [MaxLength(64)] public string UserId { get; set; } = default!;
        [MaxLength(64)] public string ProductId { get; set; } = default!;
        public double Score { get; set; }
        [MaxLength(32)] public string? ModelVersion { get; set; }
        public DateTime GeneratedAt { get; set; }
    }

    public class UserPropensity
    {
        [Key, MaxLength(64)] public string UserId { get; set; } = default!;
        public double Probability { get; set; }
        [MaxLength(32)] public string? ModelVersion { get; set; }
        public DateTime GeneratedAt { get; set; }
    }
}
