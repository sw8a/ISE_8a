'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

exports.saveNewFeedback = function (req, res) {
    var feedback = new Feedback(req.body);

    feedback.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(feedback);
        }
    });
};

exports.getFeedback = function (req, res) {
    res.json(req.feedback);
};


exports.feedbackById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'feedback Id is invalid'
        });
    }

    Feedback.findById(id, function (err, foundFeedback) {
        if (err) {
            return next(err);
        } 
        else if (!foundFeedback) {
            return res.status(404).send({
                message: 'No feedback found'
            });
        }
        req.feedback = foundFeedback;
        next();
    });



};