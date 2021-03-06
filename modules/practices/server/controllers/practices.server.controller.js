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
    else {
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
    }
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

// Checks how many new practices have been made this month
exports.newPracticesThisMonth = function (req, res) {
    
   
   // get the current date
     var currentDate = new Date();
     // from the currentDate we derive the first date of the month by doing the following:
     var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    //call to db to count the new practices where the 'dateCreated' field is greater than the 'firstDayOfMonth' field
    // return the count from the query
    Practice.count( { dateCreated: { $gt: firstDayOfMonth } },
     function(err, count){
        if(err){
            throw err;
        }
        else
        {
            res.json(count);
        }
    });
};

// returns how many practices are registered in total
exports.totalPractices = function (req, res) {

    Practice.count(
     function(err, count){
        if(err){
            throw err;
        }
        else
        {
            res.json(count);
        }
    });
};