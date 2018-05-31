(function () {

    var responseHandler = {

        response: function (res, data) {
            var response = {};
            response.statusCode = 200;
            response.response = data
            response.message = "Success";
            res.status(200).json(response);
        },
        error: function (res, err) {
            var error = {};
            error.statusCode = err.statusCode !==undefined ? err.statusCode : 500;
            error.message = err.message !=undefined ? err.message : "Something went wrong";
            error.stack = err.stack !=undefined ? err.stack : "Unknown Stack";
            res.status(error.statusCode).json(error);
        }
    }

    module.exports = responseHandler;

})();