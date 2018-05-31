(function(){

    var connection = require('../configs/connection');

    module.exports.beginTransaction = function(callback){
        connection.beginTransaction(function(err){
            callback(err);
        });
    };

    module.exports.rollBack = function(callback) {
        connection.rollback(function(err){
            callback(err);
        })
    };

    module.exports.commit = function(callback) {
        connection.commit(function(err){
            callback(err);
        });
    }

})();