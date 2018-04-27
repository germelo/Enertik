var ProductoModel = /** @class */ (function () {
    function ProductoModel(data) {
        this.Nombre = ko.observable("");
        this.Descripcion = ko.observable("");
        if (data !== null) {
            this.Nombre(data.Nombre);
            this.Descripcion(data.Descripcion);
        }
    }
    return ProductoModel;
}());
