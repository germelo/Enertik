using Enertik.Business.Logic;
using Enertik.UI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Enertik.UI.Web.Controllers
{
    public class CalculadorController : Controller
    {
        // GET: Calculador
        public ActionResult Index()
        {
            CalculadorBusiness calculadorBusiness = new CalculadorBusiness();

            PruebaModel model = new PruebaModel();
            model.Productos = calculadorBusiness.GetProductos();
            return View(model);
        }
    }
}