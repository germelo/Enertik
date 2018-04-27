using Enertik.UI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Enertik.UI.Services.Host.Controllers
{
    //[Authorize]
    public class CalculadorController : ApiController
    {
        [HttpGet]
        [Route("api/calculador/valorprueba")]
        public PruebaModel GetValorPrueba()
        {
            return new PruebaModel();
        }
    }
}
