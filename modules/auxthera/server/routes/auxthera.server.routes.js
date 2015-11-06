'use strict';

var auxthera = require('../controllers/auxthera.server.controller');


module.exports = function(app) {

    app.route('/api/auxthera/feedback')
        .post(auxthera.saveNewFeedback);

    app.route('/api/auxthera/feedback/:feedbackId')
        .get(auxthera.getFeedback)
        .post(auxthera.saveNewFeedback);


     app.param('feedbackId', auxthera.feedbackById);   
};
