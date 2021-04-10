using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProductRecord.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        [Required]
        [Range(0, Int32.MaxValue)]
        public double PurchasePrice { get; set; }
        
        public double SellingPrice { get; set; }
        public double  Profit { get; set; }
        public string Description { get; set; }
    }
}