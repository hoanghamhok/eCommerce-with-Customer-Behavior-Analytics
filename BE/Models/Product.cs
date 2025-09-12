using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BE.Models;

[Index("CategoryId", Name = "IX_Products_CategoryId")]
public partial class Product
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    public int Instock { get; set; }

    public int CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? Discount { get; set; }

    public string ImageUrls { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    [ForeignKey("CategoryId")]
    [InverseProperty("Products")]
    public virtual Category Category { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    [InverseProperty("Product")]
    public virtual ProductRating? ProductRating { get; set; }

    [InverseProperty("Product")]
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    [InverseProperty("Product")]
    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
