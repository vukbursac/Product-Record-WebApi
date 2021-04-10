using ProductRecord.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductRecord.Interfaces
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAll();
        Product GetById(int id);
        void Add(Product product);
        void Update(Product product);
        void Delete(Product product);
    }
}
