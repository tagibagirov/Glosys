using Glosys.Models;
using Microsoft.AspNetCore.Mvc;
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
            ViewBag.Products = _sql.Products.ToList();
            return View();
        }

        public IActionResult Products()
        {
            ViewBag.CategoreList = _sql.Categories.ToList();
            return View(_sql.Products.ToList());
        }
        public IActionResult Filter(int catId)
        {
            IQueryable<Product> productList = _sql.Products;
            if (catId != 0)
            {
                productList = _sql.Products.Where(x => x.ProductCategoryId == catId);
            }
            return Ok(productList);
        }
        public IActionResult ProductInfo(int id)
        {
            Product product = _sql.Products.FirstOrDefault(x => x.ProductId == id);
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
