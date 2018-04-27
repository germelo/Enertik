using Enertik.Business.Entities.Producto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enertik.UI.Web.Models
{
    public class PruebaModel
    {
        public PruebaModel()
        {
            ValorPrueba = "TestMVC";
            Productos = new List<Producto>();
        }
        public List<Producto> Productos { get; set; }
        public String ValorPrueba { get; set; }
    }
}
