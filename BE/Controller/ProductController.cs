using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using System.Linq;
using BE.Data;
namespace Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ShopDbContext _context;
        public ProductsController(ShopDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category) // ✅ Bao gồm dữ liệu danh mục
                .ToListAsync();

            var result = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Discount = p.Discount,Description = p.Description,
                ImageUrl = p.ImageUrls,Instock = p.Instock,
                PriceAfterDiscount = p.Discount.HasValue
                    ? Math.Round(p.Price * (1 - (decimal)p.Discount.Value / 100), 0)
                    : p.Price,

                CategoryId = p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null
            });

            return Ok(result);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Nếu cần kiểm tra CategoryId hợp lệ:
            var category = await _context.Categories.FindAsync(request.CategoryId);
            if (category == null)
                return BadRequest("CategoryId không hợp lệ!");

            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Instock = request.Instock,
                ImageUrls = request.ImageUrls,
                Discount = request.Discount,
                CategoryId = request.CategoryId,
                CreatedAt = DateTime.UtcNow
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Lấy lại thông tin Category để trả về đầy đủ
            product.Category = category;

            return Ok(product);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product request)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound();

            // Nếu muốn kiểm tra CategoryId:
            var category = await _context.Categories.FindAsync(request.CategoryId);
            if (category == null)
                return BadRequest("CategoryId không hợp lệ!");

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Instock = request.Instock;
            product.ImageUrls = request.ImageUrls;
            product.Discount = request.Discount;
            product.CategoryId = request.CategoryId;
            // product.CreatedAt giữ nguyên

            await _context.SaveChangesAsync();

            // Lấy lại thông tin Category để trả về đầy đủ
            product.Category = category;

            return Ok(product);
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa sản phẩm thành công." });
        }
        // GET: api/products/category/{categoryId}

        [HttpGet("categories/{id}")]
        public async Task<IActionResult> GetProductsByCategory(int id)
        {
            var products = await _context.Products
                .Where(p => p.CategoryId == id)
                .ToListAsync();

            return Ok(products);
        }
        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return BadRequest("Từ khóa không hợp lệ");

            var results = _context.Products
                .Where(p => p.Name.Contains(keyword))
                .ToList();

            return Ok(results);
        }
        public class ProductDto
        {
            public int Id { get; set; }
            public required string Name { get; set; }
            public decimal Price { get; set; }
            public string? Description { get; set; }
            public string? ImageUrl { get; set; }
            public int Instock { get; set; }
            public int? Discount { get; set; }
            public decimal PriceAfterDiscount { get; set; }
            public int CategoryId { get; set; }
            public string? CategoryName { get; set; }
        }
    }
}