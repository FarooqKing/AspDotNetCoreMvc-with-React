using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product.Server.Data;
using Product.Server.Model;

namespace Product.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ProductsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet("GetProducts")]
        public async Task<ActionResult<IEnumerable<Products>>> Getproducts()
        {
            return await _context.products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("GetProducts/{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProducts/{id}")]
        public async Task<IActionResult> UpdateProducts(int id, Products products)
        {
            if (id != products.Id)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateProducts")]
        public async Task<ActionResult<Products>> CreateProducts(Products products)
        {
            _context.products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.Id }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("DeleteProducts/{id}")]
        public async Task<IActionResult> DeleteProducts(int id)
        {
            var products = await _context.products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.products.Remove(products);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsExists(int id)
        {
            return _context.products.Any(e => e.Id == id);
        }
    }
}
