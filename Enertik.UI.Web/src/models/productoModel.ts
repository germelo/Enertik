class ProductoModel {
    Nombre: KnockoutObservable<string>;
    Descripcion: KnockoutObservable<string>;

    constructor(data) {
        this.Nombre = ko.observable("");
        this.Descripcion = ko.observable("");

        if (data !== null) {
            this.Nombre(data.Nombre);
            this.Descripcion(data.Descripcion);
        }
    }
}