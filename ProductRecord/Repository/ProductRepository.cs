using ProductRecord.Interfaces;
using ProductRecord.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace ProductRecord.Repository
{



    public class ProductRepository : IDisposable, IProductRepository
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IQueryable<Product> GetAll()
        {
            return db.Products.OrderBy(x => x.Name);
        }

        public Product GetById(int id)
        {
            return db.Products.Find(id);
        }

        public void Add(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
        }

        public void Update(Product product)
        {
            db.Entry(product).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public void Delete(Product product)
        {
            db.Products.Remove(product);
            db.SaveChanges();
        }

    }
}