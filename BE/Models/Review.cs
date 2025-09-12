using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BE.Models;

[Index("CreatedAt", Name = "IX_Review_CreatedAt")]
[Index("ProductId", Name = "IX_Review_ProductId")]
[Index("UserId", "ProductId", Name = "IX_Review_User_Product_Unique", IsUnique = true)]
public partial class Review
{
    [Key]
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int UserId { get; set; }

    public int Rating { get; set; }

    [StringLength(1000)]
    public string Comment { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsVerifiedPurchase { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("Reviews")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Reviews")]
    public virtual User User { get; set; } = null!;
}
