using System;
using System.Collections.Generic;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Data;

public partial class ShopDbContext : DbContext
{
    public ShopDbContext(DbContextOptions<ShopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductRating> ProductRatings { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(e => e.Status).HasDefaultValue("");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.ImageUrls).HasDefaultValue("");
        });

        modelBuilder.Entity<ProductRating>(entity =>
        {
            entity.Property(e => e.ProductId).ValueGeneratedNever();
            entity.Property(e => e.LastUpdated).HasDefaultValueSql("(getutcdate())");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getutcdate())");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email).HasDefaultValue("");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
