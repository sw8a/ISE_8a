'use strict';

var practices = require('../controllers/practices.server.controller');

module.exports = function(app) {
    
    app.route('/api/practices')
        .post(practices.saveNewPractice);

    app.route('/api/practices/:practiceId')
        .get(practices.getPractice)
        .post(practices.saveNewPractice)
        .put(practices.updatePractice);

    app.route('/api/newPracticesThisMonth')
        .get(practices.newPracticesThisMonth);

    app.route('/api/totalPractices')
        .get(practices.totalPractices);


    app.param('practiceId', practices.practiceById);   

};