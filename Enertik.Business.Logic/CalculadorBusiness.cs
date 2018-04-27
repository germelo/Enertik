using Enertik.Business.Entities.Producto;
using Enertik.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enertik.Business.Logic
{
    /// <summary>
    /// Lógica de negocio para el calculador
    /// </summary>
    public class CalculadorBusiness
    {
        public List<Producto> GetProductos()
        {
            ProductoRepository repository = new ProductoRepository();
            return repository.GetProductos();
        }
    }
}
