(function () {

    module.exports = function (connection) {
        var connectionHandler = function (req, res, next) {
            try{
                if (connection.state === "authenticated") {
                    next();
                }
                else {
                    connection.connect(function (err) {
                        if (err) {
                            process.exit(0);
                        }
                        else {
                            next();
                        }
                    });
                }
            }
            catch (err) {
                process.exit(0);
            }
        };

        return connectionHandler;
    }

})();