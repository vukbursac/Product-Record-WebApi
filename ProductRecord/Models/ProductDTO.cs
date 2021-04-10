using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductRecord.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double PurchasePrice { get; set; }
        public double SellingPrice { get; set; }
        public double Profit { get; set; }
        public string Description { get; set; }

    }
}