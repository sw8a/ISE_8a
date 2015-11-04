'use strict';

var forms = require('../controllers/forms.server.controller');

module.exports = function(app) {
    app.route('/api/forms/progressForm')
        .post(forms.saveNewProgressForm);


    app.route('/api/forms/enrollmentForm')
        .post(forms.saveNewEnrollmentForm);

    app.route('/api/forms/exitForm')
        .post(forms.saveNewExitForm);

};
