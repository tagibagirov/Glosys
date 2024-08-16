using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Glosys.Models;

public partial class GlosysContext : DbContext
{
    public GlosysContext()
    {
    }

    public GlosysContext(DbContextOptions<GlosysContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductPhoto> ProductPhotos { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-7MRJOT1\\SQLEXPRESS;Database=Glosys;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A0B60A45165");

            entity.Property(e => e.CategoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__B40CC6CD53B60200");

            entity.Property(e => e.ProductInfo).HasMaxLength(300);
            entity.Property(e => e.ProductName).HasMaxLength(50);

            entity.HasOne(d => d.ProductCategory).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductCategoryId)
                .HasConstraintName("FK__Products__Produc__5EBF139D");
        });

        modelBuilder.Entity<ProductPhoto>(entity =>
        {
            entity.HasKey(e => e.PhotoId).HasName("PK__ProductP__21B7B5E2515F4A58");

            entity.Property(e => e.PhotoName).HasMaxLength(20);

            entity.HasOne(d => d.PhotoProduct).WithMany(p => p.ProductPhotos)
                .HasForeignKey(d => d.PhotoProductId)
                .HasConstraintName("FK__ProductPh__Photo__619B8048");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C9FB5D515");

            entity.Property(e => e.UserFirsName).HasMaxLength(30);
            entity.Property(e => e.UserLastName).HasMaxLength(30);
            entity.Property(e => e.UserNickName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UserPassword).HasMaxLength(20);
            entity.Property(e => e.UserRole)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
