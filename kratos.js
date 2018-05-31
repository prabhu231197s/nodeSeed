(function () {

    var express = require('express');
    var app = express();
    var config = require('./server/configs/config.json');
    var morgan = require('morgan');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var connection = require('./server/configs/connection');
    var connectionHandler = require('./server/middlewares/connectionHandler');

    //----------------------------------Middlewares----------------------------------------//

    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({limit:'50mb',extended:'true'}));
    app.use(connectionHandler(connection));

    app.listen(config.kratos.port, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Server running on port:" + config.kratos.port);
        }
    });

    var routes = require('./server/index')(app);

    process.on('SIGNINT', function () {
        connection.end(function () {
            console.log('DB connection closed through App termination');
            process.exit(0);
        });
    });

    module.exports = app;

})();