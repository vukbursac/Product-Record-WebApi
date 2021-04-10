namespace ProductRecord.Migrations
{
    using ProductRecord.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ProductRecord.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ProductRecord.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.Products.AddOrUpdate(
                new Product() { Id = 1, Name = "Intel Core i5 6600K", PurchasePrice = 95, SellingPrice = 120, Profit = 25, Description = "CPU" },
                new Product() { Id = 2, Name = "Intel Core i7 8700K", PurchasePrice = 185, SellingPrice = 150, Profit = -35, Description = "CPU" },
                new Product() { Id = 3, Name = "AMD Ryzen 7 3700x", PurchasePrice = 220, SellingPrice = 250, Profit = 30, Description = "CPU" },
                new Product() { Id = 4, Name = "Asus ROG Strix RX570", PurchasePrice = 80, SellingPrice = 130, Profit = 50, Description = "GPU" },
                new Product() { Id = 5, Name = "ROG 3060", PurchasePrice = 200,  Description = "GPU" }


                );
            context.SaveChanges();
        }
    }
}
