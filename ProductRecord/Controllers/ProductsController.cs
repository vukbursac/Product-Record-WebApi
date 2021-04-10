using AutoMapper;
using AutoMapper.QueryableExtensions;
using ProductRecord.Interfaces;
using ProductRecord.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ProductRecord.Controllers
{
    public class ProductsController : ApiController
    {
        IProductRepository repo { get; set; }

        public ProductsController(IProductRepository repository)
        {
            repo = repository;
        }

        //GET api/products
        [ResponseType(typeof(ProductDTO))]
        public IQueryable<ProductDTO> GetAll()
        {
            return repo.GetAll().ProjectTo<ProductDTO>();
        }

        //GET route api/products/{id}
        [Authorize]
        [ResponseType(typeof(ProductDTO))]
        public IHttpActionResult GetById(int id)
        {
            var hotel = repo.GetById(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(Mapper.Map<ProductDTO>(hotel));
        }

        //POST api/products/
        [Authorize]
        [ResponseType(typeof(ProductDTO))]
        public IHttpActionResult Post(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            repo.Add(product);

            return CreatedAtRoute("DefaultApi", new { id = product.Id }, Mapper.Map<ProductDTO>(product));
        }
        //PUT api/products/2
        [Authorize]
        [ResponseType(typeof(ProductDTO))]
        public IHttpActionResult Put(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != product.Id)
            {
                return BadRequest();
            }
            try
            {
                repo.Update(product);
            }
            catch (Exception)
            {

                return BadRequest();
            }
            return Ok(Mapper.Map<ProductDTO>(product));
        }


        //DELETE api/products/{id}
        [Authorize]
        [ResponseType(typeof(void))]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var product = repo.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            repo.Delete(product);
            return CreatedAtRoute("DefaultApi", new { id = product.Id }, HttpStatusCode.NoContent);

        }
    }
}
