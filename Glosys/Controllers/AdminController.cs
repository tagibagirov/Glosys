using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Glosys.Models;

namespace Glosys.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult AddProduct()
        {
            return View();
        }
        public ActionResult AddService()
        {
            return View();
        }
    }
}
