using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using BE.Models;
using BE.Data;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WishlistController : ControllerBase
    {
        private readonly ShopDbContext _context;

        public WishlistController(ShopDbContext context)
        {
            _context = context;
        }

        // GET: api/wishlist/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlistByUser(int userId)
        {
            var wishlist = await _context.Wishlists
                .Include(w => w.Product)
                .Where(w => w.UserId == userId)
                .ToListAsync();

            return Ok(wishlist);
        }

        // POST: api/wishlist
        [HttpPost]
        public async Task<ActionResult> AddToWishlist([FromBody] WishlistDto dto)
        {
            // Kiểm tra xem sản phẩm đã có trong wishlist của user chưa
            var exists = await _context.Wishlists
                .AnyAsync(w => w.UserId == dto.UserId && w.ProductId == dto.ProductId);
            if (exists)
                return BadRequest("Sản phẩm đã có trong wishlist.");
            // Tạo wishlist entity
            var wishlist = new Wishlist
            {
                UserId = dto.UserId,
                ProductId = dto.ProductId
            };
            _context.Wishlists.Add(wishlist);
            await _context.SaveChangesAsync();

            return Ok(wishlist);
        }


        // DELETE: api/wishlist?userId=1&productId=2
        [HttpDelete]
        public async Task<ActionResult> RemoveFromWishlist(int userId, int productId)
        {
            var item = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

            if (item == null)
                return NotFound("Không tìm thấy sản phẩm trong wishlist.");

            _context.Wishlists.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Đã xoá khỏi wishlist.");
        }
        public class WishlistDto
        {
            public int UserId { get; set; }
            public int ProductId { get; set; }
        }

    }
}