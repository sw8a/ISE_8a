'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),

    Auxthera = mongoose.model('Auxthera'),
    AuxAdminTasks = mongoose.model('AuxAdminTasks'),
    Feedback = mongoose.model('Feedback'),
    DogBreeds = mongoose.model('DogBreeds'),
    DogFood = mongoose.model('DogFood');
    

// Auxthera functions

exports.saveNewAuxthera = function (req, res) {
    var auxthera = new Auxthera(req.body);

    auxthera.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(Auxthera);
        }
    });
};

exports.getAuxthera = function (req, res) {
    res.json(req.auxthera);
};


exports.auxtheraById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'auxthera Id is invalid'
        });
    }

    Auxthera.findById(id, function (err, foundAuxthera) {
        if (err) {
            return next(err);
        } 
        else if (!foundAuxthera) {
            return res.status(404).send({
                message: 'No auxthera found'
            });
        }
        req.auxthera = foundAuxthera;
        next();
    });
};


// AuxAdminTasks functions

exports.saveNewAuxAdminTasks = function (req, res) {
    var auxAdminTasks = new AuxAdminTasks(req.body);

    auxAdminTasks.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(AuxAdminTasks);
        }
    });
};

exports.getAuxAdminTasks = function (req, res) {
    res.json(req.auxAdminTasks);
};


exports.auxAdminTasksById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'auxAdminTasks Id is invalid'
        });
    }

    AuxAdminTasks.findById(id, function (err, foundAuxAdminTasks) {
        if (err) {
            return next(err);
        } 
        else if (!foundAuxAdminTasks) {
            return res.status(404).send({
                message: 'No auxAdminTasks found'
            });
        }
        req.auxAdminTasks = foundAuxAdminTasks;
        next();
    });
};


// Feedback functions

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


// Dog Breeds functions

exports.saveNewDogBreeds = function (req, res) {
    var dogBreeds = new DogBreeds(req.body);

    dogBreeds.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dogBreeds);
        }
    });
};

exports.getDogBreeds = function (req, res) {
    res.json(req.dogBreeds);
};


exports.dogBreedsById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'dogBreeds Id is invalid'
        });
    }

    DogBreeds.findById(id, function (err, foundDogBreeds) {
        if (err) {
            return next(err);
        } 
        else if (!foundDogBreeds) {
            return res.status(404).send({
                message: 'No dogBreeds found'
            });
        }
        req.dogBreeds = foundDogBreeds;
        next();
    });
};


// Dog Food functions

exports.saveNewDogFood = function (req, res) {
    var dogFood = new DogFood(req.body);

    dogFood.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dogFood);
        }
    });
};

exports.getDogFood = function (req, res) {
    res.json(req.dogFood);
};


exports.dogFoodById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'dogFood Id is invalid'
        });
    }

    DogFood.findById(id, function (err, foundDogFood) {
        if (err) {
            return next(err);
        } 
        else if (!foundDogFood) {
            return res.status(404).send({
                message: 'No dogFood found'
            });
        }
        req.dogFood = foundDogFood;
        next();
    });
};