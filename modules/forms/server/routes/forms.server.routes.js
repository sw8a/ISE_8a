'use strict';

var forms = require('../controllers/forms.server.controller');

module.exports = function(app) {
    app.route('/api/forms/progressForm')
        .post(forms.saveNewProgressForm);

    app.route('/api/forms/progressForm/:progressFormId')
        .get(forms.getProgressForm)
        .post(forms.saveNewProgressForm)
        .put(forms.updateProgressForm);

    app.route('/api/forms/enrollmentForm')
        .post(forms.saveNewEnrollmentForm);

    app.route('/api/forms/enrollmentForm/:enrollmentFormId')
        .get(forms.getEnrollmentForm)
        .post(forms.saveNewEnrollmentForm)
        .put(forms.updateEnrollmentForm);

    app.route('/api/forms/exitForm')
        .post(forms.saveNewExitForm);

    app.route('/api/forms/exitForm/:exitFormId')
        .get(forms.getExitForm)
        .post(forms.saveNewExitForm)
        .put(forms.updateExitForm);


    app.param('progressFormId', forms.progressFormById);
    app.param('enrollmentFormId', forms.enrollmentFormById);
    app.param('exitFormId', forms.exitFormById);

};
