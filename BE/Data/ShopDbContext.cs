using System;
using System.Collections.Generic;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

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

    public virtual DbSet<EventRaw> EventRaws { get; set; }
    public virtual DbSet<UserFeature> UserFeatures { get; set; }
    public virtual DbSet<UserRecommendation> UserRecommendations { get; set; }
    public virtual DbSet<UserPropensity> UserPropensities { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.ConfigureWarnings(warnings => 
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }
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
        // EventRaws
        modelBuilder.Entity<EventRaw>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(64);
            e.Property(x => x.Ts).IsRequired();
            e.Property(x => x.AnonId).HasMaxLength(64);
            e.Property(x => x.UserId).HasMaxLength(64);
            e.Property(x => x.Url).HasMaxLength(2048);
            e.Property(x => x.Referrer).HasMaxLength(2048);
            e.Property(x => x.Ua).HasMaxLength(512);
            e.Property(x => x.PropsJson);
            e.Property(x => x.CreatedAt).HasDefaultValueSql("SYSUTCDATETIME()");
            e.HasIndex(x => new { x.Name, x.Ts });
        });

        // UserFeatures
        modelBuilder.Entity<UserFeature>(e =>
        {
            e.HasKey(x => x.UserId);
            e.Property(x => x.UserId).HasMaxLength(64);
            e.Property(x => x.Monetary).HasColumnType("decimal(18,2)");
        });

        // UserRecommendations (composite key)
        modelBuilder.Entity<UserRecommendation>(e =>
        {
            e.HasKey(x => new { x.UserId, x.ProductId });
            e.Property(x => x.UserId).HasMaxLength(64);
            e.Property(x => x.ProductId).HasMaxLength(64);
            e.Property(x => x.ModelVersion).HasMaxLength(32);
            e.HasIndex(x => new { x.UserId, x.Score });
        });

        // UserPropensity
        modelBuilder.Entity<UserPropensity>(e =>
        {
            e.HasKey(x => x.UserId);
            e.Property(x => x.UserId).HasMaxLength(64);
            e.Property(x => x.ModelVersion).HasMaxLength(32);
        });
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
