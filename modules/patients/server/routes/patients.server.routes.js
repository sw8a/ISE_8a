'use strict';

var patients = require('../controllers/patients.server.controller');

module.exports = function(app) {
    
    app.route('/api/patients')
        .post(patients.saveNewPatient);

    app.route('/api/patients:patientId')
        .put(patients.updatePatient);

        //update is put

};