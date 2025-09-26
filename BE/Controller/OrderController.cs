using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using BE.Data;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ShopDbContext _context;

        public OrderController(ShopDbContext context)
        {
            _context = context;
        }

        // Lấy userId từ token
        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : (int?)null;
        }
        //

        [HttpGet("admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    CreatedAt = o.OrderDate,
                    OrderDetails = o.OrderDetails.Select(od => new OrderDetailDto
                    {
                        ProductId = od.ProductId,
                        Quantity = od.Quantity,
                        Price = od.UnitPrice,
                        ProductName = od.Product.Name
                    }).ToList()
                }).ToListAsync();

            return Ok(orders);
        }


        /// <summary>
        /// Lấy danh sách các đơn hàng của người dùng
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders);
        }


        /// <summary>
        /// Lấy chi tiết đơn hàng theo orderId
        /// </summary>
        [HttpGet("{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderDetail(int orderId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");
            var order = await _context.Orders.Include(o => o.OrderDetails).ThenInclude(od => od.Product).Include(o => o.User)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.UserId == userId);
            if (order == null)
                return NotFound("Không tìm thấy đơn hàng.");
            var details = await _context.OrderDetails
                .Where(d => d.OrderId == orderId)
                .Include(d => d.Product)
                .ToListAsync();
            return Ok(new
            {
                order.OrderId,
                order.OrderDate,
                order.TotalAmount,
                CustomerName = order.User.FullName,      // Giả sử User có FullName
                CustomerEmail = order.User.Email,
                PhoneNumber = order.User.Phone,
                Items = details.Select(d => new
                {
                    d.ProductId,
                    ProductName = d.Product.Name,
                    d.Quantity,
                    d.UnitPrice,
                    Total = d.Quantity * d.UnitPrice
                })
            });
        }
        [HttpDelete("{id}")]
        // [Authorize(Roles = "admin")] // Chỉ admin mới được xóa đơn
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng." });
            }

            // Xóa chi tiết đơn hàng trước (nếu có)
            _context.OrderDetails.RemoveRange(order.OrderDetails);

            // Xóa đơn hàng
            _context.Orders.Remove(order);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xoá đơn hàng thành công." });
        }
    }
    public class OrderDto
    {
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
    }

public class OrderDetailDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; }
    }
}