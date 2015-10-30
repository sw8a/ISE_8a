'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

// Saves the progress form
exports.saveNewPatient = function (req, res) {
    var patient = new Patient(req.body);

    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patient);
        }
    });
};


exports.updatePatient = function (req, res) {
    var patient = req.patient;

    console.log("Update patient 1");

    if(patient.formSave) {
        // Adding new form reference to patient document
        delete patient.formSave;
        console.log("Update patient 1");

        if(patient.enrollmentForm) {
            // add enrollment form
            console.log("Update patient 2");
            patient.findByIdAndUpdate(
                patient._id,
                {
                    $set: { 'enrollmentForm': patient.enrollmentForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        console.log("Update patient 3");
                        res.json(patient);
                    }
                }

            );
        }
        else if(patient.exitForm) {
            // add exit form
            patient.findByIdAndUpdate(
                patient._id,
                {
                    $set: { 'exitForm': patient.exitForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(patient);
                    }
                }

            );
        }
        else if(patient.progressForm) {
            // push progress form
            patient.findByIdAndUpdate(
                patient._id,
                {
                    $push: { 'progressForms': patient.newProgressForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(patient);
                    }
                }

            );
        }
    }
    else {
        // All other edits would be done here
    }
};