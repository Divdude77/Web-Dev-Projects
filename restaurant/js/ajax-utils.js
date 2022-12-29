(function (global) {  //Creating an IIFE

    // Set up a namespace for our utility
    var ajaxUtils = {};

    // Function that returns an HTTP request object
    function getRequestObject() {
        if (global.XMLHttpRequest) {       // Latest version of HTTP request object
            return (new XMLHttpRequest());
        }

        else if (global.ActiveXObject) {     // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }

        else {
            global.alert("Ajax is not supported");
            return(null);
        }
    }

    // Function that makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = 
        function(requestUrl, responseHandler, isJsonResponse) {
            // Creating the request
            var request = getRequestObject();
            request.onreadystatechange = 
                function() {
                    handleResponse(request, responseHandler, isJsonResponse);
                }
            request.open("GET", requestUrl, true);
            // Sending the request
            request.send(null); // Put query parameters as part of request body (null) for POST
        }

    // Function that calls the previously defined 'responseHandler' function 
    // if response is ready and not an error
    function handleResponse(request, responseHandler, isJsonResponse) {
        if (request.readyState == 4 && request.status == 200) {
            if (isJsonResponse == undefined || isJsonResponse) {  //Default undefined isJsonResponse to true
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }
    
    // Expose the utility to the global object
    global.$ajaxUtils = ajaxUtils;
})(window);

