'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

// Saves the progress form
exports.saveNewPatient = function (req, res) {
    var patient = new Patient(req.body);
    console.log(patient);

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
    var patient = req.body;

    console.log('update patient');

    if(patient.formSave) {
        // Adding new form reference to patient document

        if(patient.enrollmentForm) {
            // add enrollment form and petOwner
            Patient.findByIdAndUpdate(
                patient._id,
                {
                    $set: { 
                        enrollmentForm: patient.enrollmentForm,
                        petOwner: patient.petOwner 
                    } 
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

        else if(patient.exitForm) {
            // add exit form
            Patient.findByIdAndUpdate(
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

        else if(patient.newProgressForm) {
            // push progress form
            Patient.findByIdAndUpdate(
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
        var changedData = patient.changedData;
        var patientId = patient._id;
        delete patient.changedData;
        delete patient._id;
        
        Patient.findByIdAndUpdate(
            patientId,
            {
                $push: { 'changedData': changedData },
                $set: patient
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
};

exports.getPatient = function (req, res) {
    res.json(req.patient);
};


exports.patientById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Patient Id is invalid'
        });
    }

    Patient.findById(id).populate('enrollmentForm progressForms exitForm petOwner').exec( function (err, foundPatient) {
        if (err) {
            return next(err);
        } 
        else if (!foundPatient) {
            return res.status(404).send({
                message: 'No patient found'
            });
        }
        req.patient = foundPatient;
        next();
    });
};