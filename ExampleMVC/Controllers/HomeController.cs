using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using ExampleMVC.Models;

namespace ExampleMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult UsingJavascript()
        {
            return View();
        }

        [HttpGet]
        public ActionResult HelloWorld()
        {
            return View();
        }

        [HttpPost]
        public ActionResult HelloWorld(HelloWorldModel model)
        {
            Thread.Sleep(1500);//simulate a really long request
            return Json(new JSONResponse()
            {
                data = String.Format("{0} - Thanks for checking out the standards", model.Name),
                eventName = "HelloFromTheServer",
                code = 200
            }
        );
        }
    }
}