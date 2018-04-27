var App;
(function (App) {
    var TOKENKEY = "accessToken";
    App.RESPONSE_STATUS_SUCCED = 2;
    App.RESULT_CODE_ERROR_NO_CAPTURADO = "-1";
    App.RESULT_CODE_ERROR_VALIDACION = "-2";
    App.ERROR_CODE_EXPIRED_SESSION = 18;
    App.CODE_EMISOR_OFFICEBANKING = 2;
    var MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;
    var MILISEGUNDOS_POR_ANIO = MILISEGUNDOS_POR_DIA * 365;
    App.CODIGO_MONEDA_PESOS_CHILENOS = "CLP";
    App.EMAIL_REGEX = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    App.TEXTFIELD_REGEX = "^[a-zA-Z0-9_ \u002C\u002E\u00E0-\u00FC\u00F1\u00D1]*$";
    App.TEXTFIELD_NONUMBERS_REGEX = "^[a-zA-Z_ \u002C\u002E\u00E0-\u00FC\u00F1\u00D1]*$";
    App.TEXTFIELD_WITHSPECIAL_REGEX = "^[a-zA-Z0-9 \u002E\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00F1\u00D1\u0026\u0040\u002A\u0023\u002C\u0028\u0029\u003F\u003B\u003A\u002D]*$";
    var queue = 0;
    function unBlockUIAndResetQueue() {
        $.unblockUI();
        queue = 0;
    }
    App.unBlockUIAndResetQueue = unBlockUIAndResetQueue;
    function mapCuentasConMonedaDropDownModelArray(data, array) {
        ko.utils.arrayMap(data, function (e) {
            array.push(new CreateCuentaConMonedaDropDownModel(e));
        });
        decreaseBlockUIQueueAndCheckIfUnblockUI();
    }
    App.mapCuentasConMonedaDropDownModelArray = mapCuentasConMonedaDropDownModelArray;
    ;
    function mapCuentasDropDownModelArray(data, observableArray, createElementFunction) {
        ko.utils.arrayMap(data, function (e) {
            observableArray.push(new createElementFunction(e.NumeroCuenta, e.NumeroCuentaFormated, e.CodigoProductoCuenta));
        });
        decreaseBlockUIQueueAndCheckIfUnblockUI();
    }
    App.mapCuentasDropDownModelArray = mapCuentasDropDownModelArray;
    ;
    function mapStandarDropDownModelArray(data, observableArray, createElementFunction) {
        ko.utils.arrayMap(data, function (e) {
            observableArray.push(new createElementFunction(e.Cod, e.Descripcion, e.IsDivider));
        });
    }
    App.mapStandarDropDownModelArray = mapStandarDropDownModelArray;
    ;
    function mapStandarDropDownArray(data, observableArray) {
        ko.utils.arrayMap(data, function (e) {
            observableArray.push(new createStandarDropDownModel(e.Cod, e.Descripcion, e.IsDivider));
        });
    }
    App.mapStandarDropDownArray = mapStandarDropDownArray;
    ;
    function createStandarDropDownModel(key, value, isdivider) {
        var self = this;
        self.key = ko.observable(key);
        self.value = ko.observable(value);
        self.isdivider = ko.observable(isdivider);
    }
    App.createStandarDropDownModel = createStandarDropDownModel;
    ;
    function CreateCuentaConMonedaDropDownModel(cuentaConMonedaModel) {
        var c = this;
        c.key = ko.observable(cuentaConMonedaModel.NumeroCuenta);
        c.value = ko.observable(cuentaConMonedaModel.NumeroCuentaFormated + " | " + cuentaConMonedaModel.DescripcionMoneda);
        c.producto = ko.observable(cuentaConMonedaModel.CodigoProductoCuenta);
        c.codigoMoneda = ko.observable(cuentaConMonedaModel.CodigoMoneda);
        c.descripcionMoneda = ko.observable(cuentaConMonedaModel.DescripcionMoneda);
    }
    ;
    function createCuentaDropDownModel(key, value, producto) {
        var self = this;
        self.key = ko.observable(key);
        self.value = ko.observable(value);
        self.producto = ko.observable(producto);
    }
    App.createCuentaDropDownModel = createCuentaDropDownModel;
    ;
    function getProductoFromCuentaSelected(cuentas, numeroCuenta) {
        var cuenta = ko.utils.arrayFilter(cuentas, function (cuenta) { return cuenta.key() === numeroCuenta; });
        if (cuenta && cuenta.length > 0) {
            return cuenta[0].producto();
        }
        return null;
    }
    App.getProductoFromCuentaSelected = getProductoFromCuentaSelected;
    ;
    function getStandarDropDownModelByKey(models, key) {
        var model = ko.utils.arrayFilter(models, function (m) { return m.key() === key; });
        if (model && model.length > 0) {
            return model[0];
        }
        return null;
    }
    App.getStandarDropDownModelByKey = getStandarDropDownModelByKey;
    ;
    function getMonedaFromCuentaSelected(cuentas, numeroCuenta) {
        var cuenta = ko.utils.arrayFilter(cuentas, function (cuenta) { return cuenta.key() === numeroCuenta; });
        if (cuenta && cuenta.length > 0) {
            return cuenta[0].codigoMoneda();
        }
        return null;
    }
    App.getMonedaFromCuentaSelected = getMonedaFromCuentaSelected;
    ;
    function getCuentaConMonedaDropDownModelFromCuentaSelected(cuentas, numeroCuenta) {
        var cuenta = ko.utils.arrayFilter(cuentas, function (cuenta) { return cuenta.key() === numeroCuenta; });
        if (cuenta && cuenta.length > 0) {
            return cuenta[0];
        }
        return null;
    }
    App.getCuentaConMonedaDropDownModelFromCuentaSelected = getCuentaConMonedaDropDownModelFromCuentaSelected;
    ;
    function getDDMMAAAAConGuiones(dia, mes, anio) {
        return formatDigito2Caracteres(dia) + "-" + formatDigito2Caracteres(mes) + "-" + anio;
    }
    App.getDDMMAAAAConGuiones = getDDMMAAAAConGuiones;
    function getUltimoDiaDelMes(mes, anio) {
        var lastDay = new Date(anio, mes, 0);
        return lastDay.getDate();
    }
    App.getUltimoDiaDelMes = getUltimoDiaDelMes;
    function formatDigito2Caracteres(caracter) {
        var pad = "00";
        return (pad + caracter).slice(-pad.length);
    }
    function diferenciaAnios(dia1, dia2) {
        var diaInicio = new Date(dia1);
        var diaFin = new Date(dia2);
        var datediff = diaInicio.valueOf() - diaFin.valueOf();
        return Math.floor(datediff / MILISEGUNDOS_POR_ANIO);
    }
    App.diferenciaAnios = diferenciaAnios;
    function toFechaHoyBindeable() {
        return toFechaBindeable(new Date());
    }
    App.toFechaHoyBindeable = toFechaHoyBindeable;
    function toFechaDiferenciaHoyBindeable(diasDiferencia) {
        var hoy = new Date();
        var date = hoy.setDate(hoy.getDate() + diasDiferencia);
        return Globalize.format(new Date(date), Utils.patternDate);
    }
    App.toFechaDiferenciaHoyBindeable = toFechaDiferenciaHoyBindeable;
    function toFechaBindeable(date) {
        return Globalize.format(date, Utils.patternDate);
    }
    App.toFechaBindeable = toFechaBindeable;
    function diferenciaEntreDias(dia1, dia2) {
        var diaInicio = new Date(dia1);
        var diaFin = new Date(dia2);
        var datediff = diaInicio.valueOf() - diaFin.valueOf();
        return Math.floor(datediff / MILISEGUNDOS_POR_DIA);
    }
    App.diferenciaEntreDias = diferenciaEntreDias;
    function downloadFile(url, failCallback) {
        refreshSession();
        $.blockUI();
        $.fileDownload(url)
            .done(function () { $.unblockUI(); })
            .fail(function (result, urlError) {
                $.unblockUI();
                if (failCallback) {
                    failCallback(result, urlError);
                }
            });
    }
    App.downloadFile = downloadFile;
    function downloadFilePost(url, data, failCallback) {
        refreshSession();
        $.blockUI();
        $.fileDownload(url, {
            httpMethod: "POST",
            data: data
        })
            .done(function () { $.unblockUI(); })
            .fail(function (result, urlError) {
                $.unblockUI();
                if (failCallback) {
                    failCallback(result, urlError);
                }
            });
    }
    App.downloadFilePost = downloadFilePost;
    function getHeaders() {
        var token = getTokenStored();
        var headers = {};
        headers.Authorization = "Bearer " + token;
        return headers;
    }
    App.getHeaders = getHeaders;
    function blockUISolid() {
        $.blockUI({
            message: "<div class=\"loading\"><div class=\"cnt-load\"><svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"27px\" height=\"25px\" viewBox=\"0 0 27 25\" enable-background=\"new 0 0 27 25\" xml:space=\"preserve\"><path fill=\"#ec0000\" d=\"M13.9,1.19c0,3.07,5.1,6.49,5.1,10c0,0,0,0.33-0.14,0.7C23.63,12.9,27,15.3,27,18.11c0,3.771-6.02,6.87-13.469,6.89h-0.15C6,25,0,22,0,18.25c0-2.81,3.66-5.08,8.07-6.29c0,1.55,5.03,6.459,5.15,8.45c0,0,0.02,0.17,0.02,0.36c0,0.101,0,0.19-0.02,0.29c1.08-0.58,1.08-2.4,1.08-2.4c0-4.3-4.88-6.22-4.88-10.45c0-1.65,0.75-2.86,1.44-3.2V6.2c0,3.07,5.28,6.51,5.28,9.32v0.92c1.23-0.489,1.23-2.79,1.23-2.79c0-3.87-4.911-6.02-4.911-10.45c0-1.65,0.76-2.86,1.44-3.2V1.19z\"/><div class=\"uil-ring-css\"><div></div></div></div></div>",
            css: { border: '0px solid #FFF', cursor: 'wait', backgroundColor: '#FFF' },
            overlayCSS: { backgroundColor: '#FFF', opacity: 1, cursor: 'wait' }
        });
    }
    App.blockUISolid = blockUISolid;
    function getTokenStored() {
        var token = sessionStorage.getItem(TOKENKEY);
        if (!token) {
            var loginData = {
                grant_type: "password"
            };
            var userData = getToken(loginData);
            token = userData.token;
        }
        return token;
    }
    function removeTokenStored() {
        sessionStorage.removeItem(TOKENKEY);
    }
    App.removeTokenStored = removeTokenStored;
    function getToken(loginData) {
        var userData = {};
        userData.userName = null;
        userData.token = null;
        $.ajax({
            type: "POST",
            url: window.uiServiceHostUrl + "/Token",
            async: false,
            data: loginData
        }).done(function (data) {
            userData.userName = data.userName;
            userData.token = data.access_token;
            sessionStorage.setItem(TOKENKEY, data.access_token);
        });
        return userData;
    }
    function redirectToAction(action, data) {
        var form = $("<form method=\"POST\" action=\"" + window.baseUrl + action + "\"></form>");
        form.append($("<input>", {
            type: "hidden",
            id: "data",
            name: "data",
            value: JSON.stringify(data)
        }));
        $("body").append(form);
        form.submit();
    }
    App.redirectToAction = redirectToAction;
    function redirectTop(url) {
        window.top.location.href = url;
    }
    App.redirectTop = redirectTop;
    function redirectGeneralError() {
        redirectError(window.codigoErrorEmisorOfficeBanking, window.codigoErrorNoLoPodemosAtender);
    }
    App.redirectGeneralError = redirectGeneralError;
    function redirectTimeOutServicesError() {
        redirectError(window.codigoErrorEmisorMiddleware, window.codigoServicioTimeOut);
    }
    App.redirectTimeOutServicesError = redirectTimeOutServicesError;
    function redirectError(codigoErrorEmisor, codigoError) {
        window.location.href = window.baseUrl + "/error/index?codigoErrorEmisor=" + codigoErrorEmisor + "&codigoError=" + codigoError;
    }
    App.redirectError = redirectError;
    function redirectTimeOutServicesErrorTop() {
        redirectErrorTop(window.codigoErrorEmisorMiddleware, window.codigoServicioTimeOut);
    }
    App.redirectTimeOutServicesErrorTop = redirectTimeOutServicesErrorTop;
    function redirectErrorTop(codigoErrorEmisor, codigoError) {
        var url = window.baseUrl + "/error/index?codigoErrorEmisor=" + codigoErrorEmisor + "&codigoError=" + codigoError;
        redirectTop(url);
    }
    App.redirectErrorTop = redirectErrorTop;
    function redirectToNoExisteCuentasAsociadas() {
        redirectError(window.codigoErrorEmisorOfficeBanking, window.codigoNoExisteCuentasAsociadas);
    }
    App.redirectToNoExisteCuentasAsociadas = redirectToNoExisteCuentasAsociadas;
    function postTo(url, action, requestBody, doneCallback) {
        increaseBlockUIQueue(true);
        $.ajax({
            type: "POST",
            url: url + action,
            data: JSON.stringify(requestBody),
            headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        }).fail(function (jqXhr) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                redirectTop(urlToRedirect);
                return;
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        });
    }
    App.postTo = postTo;
    function postToCallback(url, action, requestBody, doneCallback, failCallback) {
        increaseBlockUIQueue(true);
        $.ajax({
            type: "POST",
            url: url + action,
            data: JSON.stringify(requestBody),
            headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        }).fail(function (jqXhr, exception) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                redirectTop(urlToRedirect);
                return;
            }
            if (failCallback) {
                failCallback(jqXhr, exception);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        });
    }
    App.postToCallback = postToCallback;
    function postToUI(action, requestBody, doneCallback) {
        postTo(window.baseUrl, action, requestBody, doneCallback);
    }
    App.postToUI = postToUI;
    function postToUICallback(action, requestBody, doneCallback, failCallback) {
        postToCallback(window.baseUrl, action, requestBody, doneCallback, failCallback);
    }
    App.postToUICallback = postToUICallback;
    function postToUIService(action, requestBody, doneCallback) {
        postTo(window.uiServiceHostUrl, action, requestBody, doneCallback);
    }
    App.postToUIService = postToUIService;
    function postToUIServiceCallback(action, requestBody, doneCallback, failCallback) {
        postToCallback(window.uiServiceHostUrl, action, requestBody, doneCallback, failCallback);
    }
    App.postToUIServiceCallback = postToUIServiceCallback;
    function getElementToMap(action, doneCallback, objectToMap) {
        increaseBlockUIQueue(true);
        $.ajax({
            type: "GET",
            url: window.uiServiceHostUrl + action,
            headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data, objectToMap);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        }).fail(function (jqXhr) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                redirectTop(urlToRedirect);
                return;
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        });
    }
    App.getElementToMap = getElementToMap;
    ;
    function getElement(action, doneCallback, failCallback) {
        increaseBlockUIQueue(true);
        $.ajax({
            type: "GET",
            url: window.uiServiceHostUrl + action,
            headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        }).fail(function (jqXhr, exception) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                redirectTop(urlToRedirect);
                return;
            }
            if (failCallback) {
                failCallback(jqXhr, exception);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        });
    }
    App.getElement = getElement;
    ;
    function getElementToMapCallback(action, doneCallback, objectToMap, failCallback, message) {
        increaseBlockUIQueue(true);
        $.ajax({
            type: "GET",
            url: window.uiServiceHostUrl + action,
            headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data, objectToMap);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        }).fail(function (jqXhr, exception) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                redirectTop(urlToRedirect);
                return;
            }
            if (failCallback) {
                failCallback(jqXhr, exception, message);
            }
            decreaseBlockUIQueueAndCheckIfUnblockUI();
        });
    }
    App.getElementToMapCallback = getElementToMapCallback;
    function increaseBlockUIQueue(shouldBlockUI) {
        queue++;
        if (shouldBlockUI) {
            if (!($(window).data()["blockUI.isBlocked"] === 1)) {
                $.blockUI();
            }
        }
    }
    App.increaseBlockUIQueue = increaseBlockUIQueue;
    function decreaseBlockUIQueueAndCheckIfUnblockUI() {
        queue--;
        if (queue <= 0) {
            $.unblockUI();
        }
    }
    App.decreaseBlockUIQueueAndCheckIfUnblockUI = decreaseBlockUIQueueAndCheckIfUnblockUI;
    function refreshSession() {
        removeTokenStored();
        $("#keepAliveFrame").attr("src", $("#keepAliveFrame").attr("src"));
        $.ajax({
            type: "GET",
            url: window.baseUrl + '/Account/Ping'
        });
    }
    App.refreshSession = refreshSession;
})(App || (App = {}));
var Utils;
(function (Utils) {
    Utils.patternDate = "yyyy-MM-ddTHH:mm:ss.fffffffzzz";
    Utils.patternShortDate = "yyyy-MM-ddTHH:mm:ss";
    function isIE() {
        var isIE = false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        return isIE || isEdge;
    }
    Utils.isIE = isIE;
    ;
    function isIELowerTen() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? (parseInt(myNav.split('msie')[1]) < 10) : false;
    }
    Utils.isIELowerTen = isIELowerTen;
    function parseDateUTC(date) {
        if (!date) {
            return "";
        }
        var shortPatterDate = Utils.patternDate.split(".")[0];
        var fullPatterDate = shortPatterDate;
        var sp = date.split(".");
        if (sp.length > 1) {
            var to;
            if (sp[1].includes("-")) {
                to = sp[1].split("-")[0].length;
            }
            else {
                to = sp[1].split("+")[0].length;
            }
            var milisecPatter = "";
            for (var i = 0; i < to; i++) {
                milisecPatter = milisecPatter + "f";
            }
            fullPatterDate = fullPatterDate + "." + milisecPatter + "zzz";
        }
        else if (date.length !== fullPatterDate.length) {
            fullPatterDate = fullPatterDate + "zzz";
        }
        return Globalize.parseDate(date, fullPatterDate);
    }
    Utils.parseDateUTC = parseDateUTC;
    function formatDate(value) {
        if (!value) {
            return "";
        }
        var valueDate;
        if (value instanceof Date) {
            valueDate = value;
        }
        else {
            valueDate = parseDateUTC(value);
        }
        return Globalize.format(valueDate, "d") || "";
    }
    Utils.formatDate = formatDate;
    function formatNumber(value, format) {
        if (value === undefined || value === null || !isNumber(value)) {
            return "";
        }
        return Globalize.format(value, format) || "";
    }
    Utils.formatNumber = formatNumber;
    function daysBetween(dateFrom, dateTo) {
        var oneDay = 1000 * 60 * 60 * 24;
        var dateFromMs = dateFrom.getTime();
        var dateToMs = dateTo.getTime();
        var differenceMs = dateToMs - dateFromMs;
        return Math.round(differenceMs / oneDay);
    }
    Utils.daysBetween = daysBetween;
    function htmlDecode(text) {
        return jQuery("<div></div>").html(text).text();
    }
    Utils.htmlDecode = htmlDecode;
    function isNumber(n) {
        return (!isNaN(parseFloat(n)) && isFinite(n));
    }
    Utils.isNumber = isNumber;
    function nullToStringEmpty(value) {
        if (!value || value === undefined || value === "" || value.length === 0) {
            return "";
        }
        return value;
    }
    Utils.nullToStringEmpty = nullToStringEmpty;
    ;
    function comprobarDigitoVerificador(valor) {
        var valorSinSeparadores = removeCharacter(valor.toLowerCase(), ".");
        valorSinSeparadores = removeCharacter(valorSinSeparadores, "-");
        var longitud = valorSinSeparadores.length;
        var rut = valorSinSeparadores.substring(0, longitud - 1);
        var digito = valorSinSeparadores.charAt(longitud - 1);
        var digitoCalculado;
        var multiplicador = 2;
        var suma = 0;
        for (var i = rut.length - 1; i >= 0; i--) {
            suma = suma + Number(rut.charAt(i)) * multiplicador;
            if (multiplicador === 7) {
                multiplicador = 2;
            }
            else {
                multiplicador++;
            }
        }
        var resto = suma % 11;
        if (resto === 1) {
            digitoCalculado = "k";
        }
        else if (resto === 0) {
            digitoCalculado = "0";
        }
        else {
            digitoCalculado = String(11 - resto);
        }
        return digito === digitoCalculado;
    }
    Utils.comprobarDigitoVerificador = comprobarDigitoVerificador;
    ;
    function validarRUT(valor) {
        var caracteresValidos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "k", "K"];
        if (!valor || valor.length < 2) {
            return false;
        }
        for (var i = 0; i < valor.length; i++) {
            if (caracteresValidos.indexOf(valor.charAt(i)) === -1) {
                return false;
            }
        }
        return comprobarDigitoVerificador(valor);
    }
    Utils.validarRUT = validarRUT;
    ;
    function formatearRUT(valor) {
        var texto = removeCharacter(valor, ".");
        texto = removeCharacter(texto, "-");
        var largo = texto.length;
        var invertido = "";
        var j = 0;
        var i;
        for (i = (largo - 1); i >= 0; i--) {
            j++;
            invertido = invertido + texto.charAt(i);
        }
        var dtexto = "";
        dtexto = dtexto + invertido.charAt(0);
        dtexto = dtexto + "-";
        var cnt = 0;
        j = 2;
        for (i = 1; i < largo; i++) {
            j++;
            if (cnt === 3) {
                dtexto = dtexto + ".";
                j++;
                dtexto = dtexto + invertido.charAt(i);
                cnt = 1;
            }
            else {
                dtexto = dtexto + invertido.charAt(i);
                cnt++;
            }
        }
        invertido = "";
        j = 0;
        for (i = (dtexto.length - 1); i >= 0; i--) {
            j++;
            invertido = invertido + dtexto.charAt(i);
        }
        return invertido;
    }
    Utils.formatearRUT = formatearRUT;
    function removeCharacter(text, character) {
        var result = "";
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) !== character) {
                result = result + text.charAt(i);
            }
        }
        return result;
    }
    Utils.removeCharacter = removeCharacter;
    function sortDropDownElementByValue(a, b) {
        var val1 = a.value().toLowerCase();
        var val2 = b.value().toLowerCase();
        if (val1 < val2) {
            return -1;
        }
        if (val1 > val2) {
            return 1;
        }
        return 0;
    }
    Utils.sortDropDownElementByValue = sortDropDownElementByValue;
    function excluirTildesKeypressEvent(data, event) {
        if (event.charCode == 0)
            return true;
        if (event.charCode == 225
            || event.charCode == 233
            || event.charCode == 237
            || event.charCode == 243
            || event.charCode == 250
            || event.charCode == 180)
            return false;
        return true;
    }
    Utils.excluirTildesKeypressEvent = excluirTildesKeypressEvent;
    ;
})(Utils || (Utils = {}));
var Culture;
(function (Culture) {
    function language() {
        return Globalize.culture(Globalize.cultureSelector).language;
    }
    Culture.language = language;
    function calendarPattern() {
        var patternDay = "dd";
        var patternMonth = "mm";
        var patternYear = "yyyy";
        var pattern = Globalize.findClosestCulture().calendar.patterns.d.toLowerCase();
        if (pattern.indexOf(patternDay) < 0) {
            pattern = pattern.replace("d", patternDay);
        }
        if (pattern.indexOf(patternMonth) < 0) {
            pattern = pattern.replace("m", patternMonth);
        }
        if (pattern.indexOf(patternYear) < 0) {
            pattern = pattern.replace("yy", patternYear);
        }
        return pattern;
    }
    Culture.calendarPattern = calendarPattern;
})(Culture || (Culture = {}));
String.prototype.format = function () {
    var formatted = this;
    for (var arg = 0; arg < arguments.length; arg++) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
Array.prototype.distinct = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (arr.indexOf(this[i]) === -1) {
            arr.push(this[i]);
        }
    }
    return arr;
};
String.prototype.isNullOrEmpty = function (value) { return !value || value === undefined || value === "" || value.length === 0; };
//# sourceMappingURL=fwk.js.map