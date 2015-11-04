'use strict';

var practices = require('../controllers/practices.server.controller');

module.exports = function(app) {
    
    app.route('/api/practices')
        .get(practices.getCalled)
        .put(practices.putCalled)
        .post(practices.saveNewPractice);

    app.route('/api/practices/:practiceId')
        .get(practices.getPractice)
        .post(practices.saveNewPractice)
        .put(practices.updatePractice);
        //.get(practices.getCalled);

    app.param('practiceId', practices.practiceById);   

};