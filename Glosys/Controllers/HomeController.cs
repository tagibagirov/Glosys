using Glosys.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq.Expressions;

namespace Glosys.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly GlosysContext _sql;

        public HomeController(ILogger<HomeController> logger, GlosysContext sql)
        {
            _logger = logger;
            _sql = sql;
        }

        public IActionResult Index()
        {
            ViewBag.Products = _sql.Products.Include(x=>x.ProductPhotos).ToList();
            return View();
        }

        public IActionResult Products(int id)
        {
            var productList = _sql.Products.Include(x => x.ProductPhotos).AsQueryable();
            if (id != 0)
            {
                productList = productList.Where(x => x.ProductCategoryId == id);
            }
            ViewBag.CategoreList = _sql.Categories.ToList();
            return View(productList.ToList());
        }
        public IActionResult ProductInfo(int id)
        {

            Product product = _sql.Products.Include(x=>x.ProductPhotos).FirstOrDefault(x => x.ProductId == id);
            return View(product);
        }
        public IActionResult Services()
        {
            return View();
        }
        public IActionResult Contacts()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
