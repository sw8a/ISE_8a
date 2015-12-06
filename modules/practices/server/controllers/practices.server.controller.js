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
    var changedData = practice.changedData;
    var practiceId = practice._id;
    delete practice.changedData;
    delete practice._id;

    Practice.findByIdAndUpdate(
        practiceId,
        {
            $push: { 'changedData': changedData },
            $set: practice
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
};

exports.getPractice = function (req, res) {
    res.json(req.practice);
};


exports.practiceById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Practice Id is invalid'
        });
    }

    Practice.findById(id).populate('patients feedback').exec( function (err, foundPractice) {
        if (err) {
            return next(err);
        } 
        else if (!foundPractice) {
            return res.status(404).send({
                message: 'No practice found'
            });
        }

        var options = {
            path: 'patients.petOwner',
            model: 'PetOwner'
        };

        Practice.populate(foundPractice, options, function (err, populatedPractice) {
            if (err) {
                return next(err);
            } 
            else if (!populatedPractice) {
                return res.status(404).send({
                    message: 'Practice population error'
                });
            }
            req.practice = foundPractice;
            next();
        });
    });
};