'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    ProgressForm = mongoose.model('ProgressForm'),
    EnrollmentForm = mongoose.model('EnrollmentForm'),
    ExitForm = mongoose.model('ExitForm'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
Progress forms functions:

saveNewProgressForm
*/




// Saves the progress form
exports.saveNewProgressForm = function (req, res) {
    var progressForm = new ProgressForm(req.body);
    //progressForm.patient = req.patient;

    progressForm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(progressForm);
        }
    });
};

// Show current progress form
exports.read = function (req, res) {
    res.json(req.progressForm);
};

// Update progress form
exports.update = function (req, res) {
    var progressForm = req.progressForm;

    /*
    progressForm.weight = req.body.weight;
    progressForm.trimauxilUse = req.body.trimauxilUse;
    // ...

    // Probably won't do updates this way to allow data version control
    */
    

    progressForm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(progressForm);
        }
    });
};

// Delete progress form
exports.delete = function (req, res) {
    var progressForm = req.progressForm;

    progressForm.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(progressForm);
        }
    });
};

// List progress forms
exports.list = function (req, res) {
    ProgressForm.find().sort('-created').populate('patient').exec(function (err, progressForms) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(progressForms);
        }
    });
};

// Progress form middleware
exports.progressFormByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Progress form is invalid'
        });
    }

    ProgressForm.findById(id).populate('patient').exec(function (err, progressForm) {
        if (err) {
            return next(err);
        } else if (!progressForm) {
            return res.status(404).send({
                message: 'No progressForm with that identifier has been found'
            });
        }
        req.progressForm = progressForm;
        next();
    });

};

/*
Enrollment forms functions:

saveNewEnrollmentForm
*/

exports.saveNewEnrollmentForm = function (req, res) {
    var enrollmentForm = new EnrollmentForm(req.body);
    
    enrollmentForm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(enrollmentForm);
        }
    });
};



/*
Exit forms functions:

saveNewExitForm
*/

exports.saveNewExitForm = function (req, res) {
    var exitForm = new ExitForm(req.body);
    exitForm.patient = req.patient;

    exitForm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(exitForm);
        }
    });
};