using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using BE.Data;

namespace Controllers{
    [ApiController]
    [Route("api/categories")]

    public class CategoryController : ControllerBase{
        private readonly ShopDbContext _context;

        public CategoryController(ShopDbContext context){
            _context = context;
        }

        //Tạo mới danh mục
        [HttpPost]
        public async Task<ActionResult<Category>> 
                CreateCategory([FromBody] CategoryRequest request){
            try{
                var category = new Category{
                    Name = request.Name,
                    Description = request.Description
                };
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategory), 
                            new {id = category.Id}, category);
            } catch (Exception ex){
                return BadRequest(ex.Message);
            }
        }

        //Lấy danh mục theo id
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id){
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);

            if (category == null)
                return NotFound();
            return category;
        }

        //Lấy toàn bộ danh mục
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories(){
            return await _context.Categories.ToListAsync();
        }

        //Cập nhật danh mục
        [HttpPut("{id}")]
        public async Task<IActionResult> 
                UpdateCategory(int id, [FromBody] CategoryRequest request){            
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);

            if (category == null)
                return NotFound();

            category.Name = request.Name;
            category.Description = request.Description;

            await _context.SaveChangesAsync();

            return Ok(
                new {
                    message = "Cập nhật Category thành công."
                }
            );
        }

        //Xóa danh mục
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id){
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);

            if (category == null)
                return NotFound();
            
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(
                new {message = "Xóa Category thành công."}
            );
        }

    }

    public class CategoryRequest{
        public string Name {get; set;}
        public string? Description {get; set;}
    }
}