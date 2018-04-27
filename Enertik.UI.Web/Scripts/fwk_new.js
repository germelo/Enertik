var App;

(function (App) {

    function getElement(action, doneCallback, failCallback) {
        $.ajax({
            type: "GET",
            url: "http://localhost:52963" + action,
            //headers: getHeaders(),
            contentType: "application/json"
        }).done(function (data) {
            if (doneCallback) {
                doneCallback(data);
            }
        }).fail(function (jqXhr, exception) {
            if (jqXhr.status && jqXhr.status === 401) {
                var urlToRedirect = window.baseUrl + "/account/logout";
                //redirectTop(urlToRedirect);
                return;
            }
            if (failCallback) {
                //failCallback(jqXhr, exception);
            }
        });
    }

    App.getElement = getElement;

    function getHeaders() {
        //var token = getTokenStored();
        var headers = {};
        //headers.Authorization = "Bearer " + token;
        return headers;
    }
    App.getHeaders = getHeaders;

})(App || (App = {}));


