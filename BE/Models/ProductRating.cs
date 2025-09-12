using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BE.Models;

public partial class ProductRating
{
    [Key]
    public int ProductId { get; set; }

    [Column(TypeName = "decimal(3, 2)")]
    public decimal AverageRating { get; set; }

    public int TotalReviews { get; set; }

    public int Rating1Star { get; set; }

    public int Rating2Star { get; set; }

    public int Rating3Star { get; set; }

    public int Rating4Star { get; set; }

    public int Rating5Star { get; set; }

    public DateTime LastUpdated { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("ProductRating")]
    public virtual Product Product { get; set; } = null!;
}
