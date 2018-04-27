/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/knockout.d.ts" />

declare var calculadorViewModel: CalculadorViewModel;
declare var prueba: string;
declare var productos: Array<ProductoModel>

class CalculadorViewModel {

    Prueba: KnockoutObservable<string>;
    Productos: KnockoutObservableArray<ProductoModel>;

    constructor(prueba:string, productos: Array<ProductoModel>) {

        this.Prueba = ko.observable(prueba);
        this.Productos = ko.observableArray(productos);

        //this.getValorPrueba();

    }

    //getValorPrueba = (): void => {
    //    App.getElement("/api/calculador/valorprueba",
    //        this.loadValorPrueba,
    //        this.errorCallback);
    //};

    //loadValorPrueba = (response): void => {
    //    this.Prueba(response.Valor);
    //};

    //errorCallback = (): void => {
    //    this.Prueba("ERROR");
    //};
}

$(document).ready(function () {

    calculadorViewModel = new CalculadorViewModel(prueba,productos);
    ko.applyBindings(calculadorViewModel);

});