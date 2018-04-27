using Enertik.Business.Entities.Producto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enertik.DataAccess
{
    /// <summary>
    /// Provee el acceso a datos de productos
    /// </summary>
    public class ProductoRepository
    {
        #region Public Methods
        public List<Producto> GetProductos()
        {
            return new List<Producto>()
            {
                new Producto(){
                    Nombre = "Producto1",
                    Descripcion ="DescripcionProd1"
                },
                new Producto()
                {
                    Nombre = "Producto2",
                    Descripcion = "DescripcionProd2"
                }
            };
        }
        #endregion
    }
}
