/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/knockout.d.ts" />
var CalculadorViewModel = /** @class */ (function () {
    function CalculadorViewModel(prueba, productos) {
        this.Prueba = ko.observable(prueba);
        this.Productos = ko.observableArray(productos);
        //this.getValorPrueba();
    }
    return CalculadorViewModel;
}());
$(document).ready(function () {
    calculadorViewModel = new CalculadorViewModel(prueba, productos);
    ko.applyBindings(calculadorViewModel);
});
