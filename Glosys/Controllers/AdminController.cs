using Microsoft.AspNetCore.Mvc;
using Glosys.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace Glosys.Controllers
{
    //[Authorize]
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;
        private readonly GlosysContext _sql;

        public AdminController(ILogger<AdminController> logger, GlosysContext sql)
        {
            _logger = logger;
            _sql = sql;
        }
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(User user)
        {
            var istifadeci = _sql.Users.FirstOrDefault(x => x.UserNickName == user.UserNickName && x.UserPassword == user.UserPassword);
            if (istifadeci != null)
            {
                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Sid, istifadeci.UserId.ToString()),
                    new Claim(ClaimTypes.Role, istifadeci.UserRole),
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var princ = new ClaimsPrincipal(identity);
                var props = new AuthenticationProperties();
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, princ, props).Wait();
                return RedirectToAction("index", "home");
            }
            else
            {
                ModelState.AddModelError("error", "Username or password is incorrect...");
                return View();
            }
        }
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync().Wait();
            return RedirectToAction("index", "home");
        }
        public IActionResult AdminProduct(int id)
        {
            var productList = _sql.Products.Include(x => x.ProductPhotos).AsQueryable();
            if (id != 0)
            {
                productList = productList.Where(x => x.ProductCategoryId == id);
            }
            ViewBag.CategoreList = _sql.Categories.ToList();
            return View(productList.ToList());
        }
        public IActionResult AddProduct()
        {
            ViewBag.Categories = _sql.Categories.ToList();
            return View();
        }
        [HttpPost]
        public IActionResult AddProduct(Product product, IFormFile[] productPhotos)
        {
            ViewBag.Categories = _sql.Categories.ToList();
            if (!ModelState.IsValid)
            {
                return View();
            }
            _sql.Products.Add(product);
            _sql.SaveChanges();
            foreach (var item in productPhotos)
            {
                string filename = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(item.FileName);
                using (Stream stream = new FileStream("wwwroot/img/productsPhoto/" + filename, FileMode.Create))
                {
                    item.CopyTo(stream);
                }
                var productPhoto = new ProductPhoto
                {
                    PhotoName = filename,
                    PhotoProductId = product.ProductId
                };
                _sql.ProductPhotos.Add(productPhoto);
                _sql.SaveChanges();
            }
            return RedirectToAction("adminproduct", "admin");
        }
        public IActionResult EditProduct(int id)
        {
            var product = _sql.Products.Include(x => x.ProductCategory).Include(x => x.ProductPhotos).SingleOrDefault(x => x.ProductId == id);
            ViewBag.Categories = _sql.Categories.ToList();
            return View(product);
        }
        [HttpPost]
        public IActionResult EditProduct(int id, Product product, IFormFile[] productPhotos, string DeletedPhoto)
        {
            ViewBag.Categories = _sql.Categories.ToList();
            var existingProduct = _sql.Products.Include(x => x.ProductCategory).Include(x => x.ProductPhotos).SingleOrDefault(x => x.ProductId == id);
            //if (!ModelState.IsValid)
            //{
            //    return View(product);
            //}
            existingProduct.ProductName = product.ProductName;
            existingProduct.ProductInfo = product.ProductInfo;
            existingProduct.ProductCategoryId = product.ProductCategoryId;
            if (!string.IsNullOrEmpty(DeletedPhoto))
            {
                List<int> existingPhotoIdList = JsonSerializer.Deserialize<List<int>>(json: DeletedPhoto);
                if (existingPhotoIdList != null && existingPhotoIdList.Count > 0)
                {
                    var existingPhotoList = _sql.ProductPhotos.Where(x => existingPhotoIdList.Contains((int)x.PhotoId));
                    _sql.ProductPhotos.RemoveRange(existingPhotoList);
                    _sql.SaveChanges();
                }
            }
            if (productPhotos != null && productPhotos.Length > 0)
            {
                foreach (var item in productPhotos)
                {
                    string filename = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(item.FileName);
                    using (Stream stream = new FileStream("wwwroot/img/productsPhoto/" + filename, FileMode.Create))
                    {
                        item.CopyTo(stream);
                    }
                    var productPhoto = new ProductPhoto
                    {
                        PhotoName = filename,
                        PhotoProductId = id
                    };
                    _sql.ProductPhotos.Add(productPhoto);
                    _sql.SaveChanges();
                }
            }
            _sql.SaveChanges();
            return RedirectToAction("adminproduct", "admin");
        }
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            Product product = _sql.Products.SingleOrDefault(x => x.ProductId == id);
            _sql.Products.Remove(product);
            _sql.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public IActionResult AddCategory([FromBody] Category category)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            _sql.Categories.Add(category);
            _sql.SaveChanges();
            return Ok(category);
        }
        [HttpPost]
        public IActionResult EditCategory(int id, [FromBody] Category category)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var existingCategory = _sql.Categories.SingleOrDefault(x => x.CategoryId == id);
            existingCategory.CategoryName = category.CategoryName;
            _sql.SaveChanges();
            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteCategory(int id)
        {
            var category = _sql.Categories.SingleOrDefault(x => x.CategoryId == id);
            _sql.Categories.Remove(category);
            _sql.SaveChanges();
            return Ok();
        }
        public IActionResult AdminService()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddService(IFormFile[] servicePhotos)
        {
            return Ok();
        }
        public IActionResult EditService(int id)
        {
            return Ok();
        }
        [HttpPost]
        public IActionResult EditService(int id, IFormFile[] servicePhotos)
        {
            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteService(int id)
        {
            return Ok();
        }
    }
}
