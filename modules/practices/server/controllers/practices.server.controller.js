'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    Practice = mongoose.model('Practice'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

// Saves the progress form
exports.saveNewPractice = function (req, res) {
    var practice = new Practice(req.body);

    practice.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(practice);
        }
    });
};

exports.updatePractice = function (req, res) {
    var practice = req.body;

    if(practice.newPatient) {

        Practice.findByIdAndUpdate(
            practice._id,
            {
                $push: { 'patients': practice.newPatient } 
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
                    res.json(practice);
                }
            }
        );
    }
};

exports.getPractice = function (req, res) {
    res.json(req.pratice);

    console.log('IN GET PRACTICE');
};

exports.getCalled = function (req, res) {
    console.log('IN GET CALLED');
};


exports.practiceById = function (req, res, next, id) {

    console.log("IN PRACTICE BY ID");
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Practice Id is invalid'
        });
    }

    // owners needs to be populated as well
    Practice.findById(id).populate('patients').exec( function (err, foundPractice) {
        if (err) {
            return next(err);
        } 
        else if (!foundPractice) {
            return res.status(404).send({
                message: 'No pratice found'
            });
        }
        req.pratice = foundPractice;
        next();
    });
};