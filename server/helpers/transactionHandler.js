(function () {

    var dbService = require('../services/dbServices');
    var responseHandler = require('../helpers/responseHandler');

    var transactionHandler = {

        beginTransaction: function (callback) {
            dbService.beginTransaction(function (err) {
                callback(err);
            });
        },

        commit: function (res, response) {
            dbService.commit(function (commitErr) {
                if (commitErr) {
                    dbService.rollBack(function (rollErr) {
                        if (rollErr) {
                            responseHandler.error(res, rollErr);
                        }
                        else {
                            responseHandler.error(res, commitErr);
                        }
                    });
                }
                else {
                    responseHandler.response(res, response);
                }
            });
        },

        rollBack: function (res, err) {
            dbService.rollBack(function (rollErr) {
                if (rollErr) {
                    responseHandler.error(res, rollErr)
                }
                else {
                    responseHandler.error(res,err);
                }
            });
        }

    }

    module.exports = transactionHandler;

})();