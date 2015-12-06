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
exports.getProgressForm = function (req, res) {
    res.json(req.progressForm);
};

// Update progress form
exports.updateProgressForm = function (req, res) {
    var progressForm = req.progressForm;

    console.log('update form');

    ProgressForm.findByIdAndUpdate(
        progressForm._id,
        {
            $push: { 'changedData': progressForm.changedData } ,
            $set: progressForm.updatedData
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
                res.json(progressForm);
            }
        }
    );
};

// Delete progress form
exports.deleteProgressForm = function (req, res) {
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
exports.listProgressForms = function (req, res) {
    ProgressForm.find().sort('-created').exec(function (err, progressForms) {
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
exports.progressFormById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Progress form is invalid'
        });
    }

    ProgressForm.findById(id).exec(function (err, progressForm) {
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

// Show enrollment form
exports.getEnrollmentForm = function (req, res) {
    res.json(req.enrollmentForm);
};

// Update enrollment form
exports.updateEnrollmentForm = function (req, res) {
    var enrollmentForm = req.enrollmentForm;
    console.log('enrollmentForm');
    console.log(enrollmentForm);
    var changedData = enrollmentForm.changedData;
    var enrollmentFormId = enrollmentForm._id;
    delete enrollmentForm.changedData;
    delete enrollmentForm._id;
    console.log('enrollmentForm');
    console.log(enrollmentForm);

    EnrollmentForm.findByIdAndUpdate(
        enrollmentFormId,
        {
            $push: { 'changedData': changedData },
            $set: enrollmentForm
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
                res.json(enrollmentForm);
            }
        }
    );
};

// Delete enrollment form
exports.deleteEnrollmentForm = function (req, res) {
    var enrollmentForm = req.enrollmentForm;

    enrollmentForm.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(enrollmentForm);
        }
    });
};

// List enrollment forms, should only be one
exports.listEnrollmentForms = function (req, res) {
    EnrollmentForm.find().exec(function (err, enrollmentForm) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(enrollmentForm);
        }
    });
};

// Enrollment form middleware
exports.enrollmentFormById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Enrollment form is invalid'
        });
    }

    EnrollmentForm.findById(id).exec(function (err, enrollmentForm) {
        if (err) {
            return next(err);
        } else if (!enrollmentForm) {
            return res.status(404).send({
                message: 'No enrollmentForm with that identifier has been found'
            });
        }
        req.enrollmentForm = enrollmentForm;
        next();
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

// Show exit form
exports.getExitForm = function (req, res) {
    res.json(req.exitForm);
};

// Update exit form
exports.updateExitForm = function (req, res) {
    var exitForm = req.exitForm;

    ExitForm.findByIdAndUpdate(
        exitForm._id,
        {
            $push: { 'changedData': exitForm.changedData } ,
            $set: exitForm.updatedData
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
                res.json(exitForm);
            }
        }
    );
};

// Delete exit form
exports.deleteExitForm = function (req, res) {
    var exitForm = req.exitForm;

    exitForm.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(exitForm);
        }
    });
};

// List exit forms, should only be one
exports.listExitForms = function (req, res) {
    ExitForm.find().exec(function (err, exitForm) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(exitForm);
        }
    });
};

// Exit form middleware
exports.exitFormById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Exit form is invalid'
        });
    }

    ExitForm.findById(id).exec(function (err, exitForm) {
        if (err) {
            return next(err);
        } else if (!exitForm) {
            return res.status(404).send({
                message: 'No exitForm with that identifier has been found'
            });
        }
        req.exitForm = exitForm;
        next();
    });
};