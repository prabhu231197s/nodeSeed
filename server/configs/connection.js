(function(){

    var mysql = require('mysql');
    var configs = require('./config.json');

    var connection = mysql.createConnection(configs.test);

    connection.connect(function(err){
        if(err){
            console.log("Db connection error:"+err.message);
        }
        else{
            console.log("App successfully connected to DB");
        }
    });

    module.exports = connection;

})();