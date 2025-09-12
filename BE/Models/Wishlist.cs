using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BE.Models;

[Table("Wishlist")]
[Index("ProductId", Name = "IX_Wishlist_ProductId")]
[Index("UserId", Name = "IX_Wishlist_UserId")]
public partial class Wishlist
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public DateTime CreatedAt { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("Wishlists")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Wishlists")]
    public virtual User User { get; set; } = null!;
}
