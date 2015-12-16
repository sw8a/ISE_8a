'use strict';

var patients = require('../controllers/patients.server.controller');

module.exports = function(app) {
    
    app.route('/api/patients')
        .post(patients.saveNewPatient);

    app.route('/api/newPatientsThisMonth')
        .get(patients.newPatientsThisMonth);

    app.route('/api/totalPatients')
        .get(patients.totalPatients);

    app.route('/api/patients/:patientId')
        .get(patients.getPatient)
        .post(patients.saveNewPatient)
        .put(patients.updatePatient);

    // If a patientId parameter is included, this is called first to get the patient and add it to the req
    app.param('patientId', patients.patientById);   

};