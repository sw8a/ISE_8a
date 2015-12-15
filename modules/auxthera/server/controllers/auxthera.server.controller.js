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

exports.updateAuxthera = function (req, res) {
    var auxthera = req.body;

    var changedData = auxthera.changedData;
    var auxtheraId = auxthera._id;
    delete auxthera.changedData;
    delete auxthera._id;

    Auxthera.findByIdAndUpdate(
        auxtheraId,
        {
            $push: { 'changedData': changedData },
            $set: auxthera
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
                res.json(auxthera);
            }
        }
    );
};


exports.auxtheraById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'auxthera Id is invalid'
        });
    }

    Auxthera.findById(id).populate('adminTasks feedback').exec( function (err, foundAuxthera) {
        if (err) {
            return next(err);
        } 
        else if (!foundAuxthera) {
            return res.status(404).send({
                message: 'No auxthera found'
            });
        }

        var options = {
            path: 'adminTasks.dogFoods',
            model: 'DogFood'
        };/*[{
            path: 'adminTasks.dogFoods',
            model: 'DogFood'
        },
        {
            path: 'feedback.practiceId',
            model: 'Practices'
        },
        {
            path: 'feedback.patientId',
            model: 'Patients'
        }];*/

        Auxthera.populate(foundAuxthera, options, function (err, populatedAuxthera) {
            if (err) {
                return next(err);
            } 
            else if (!populatedAuxthera) {
                return res.status(404).send({
                    message: 'Auxthera population error'
                });
            }
            req.auxthera = foundAuxthera;
            next();
        });
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

exports.updateAuxAdminTasks = function (req, res) {
    var auxAdminTasks = req.body;

    var changedData = auxAdminTasks.changedData;
    var auxAdminTasksId = auxAdminTasks._id;
    delete auxAdminTasks.changedData;
    delete auxAdminTasks._id;

    AuxAdminTasks.findByIdAndUpdate(
        auxAdminTasksId,
        {
            $push: { 'changedData': changedData },
            $set: auxAdminTasks
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
                res.json(auxAdminTasks);
            }
        }
    );
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

exports.updateFeedback = function (req, res) {
    var feedback = req.body;

    var changedData = feedback.changedData;
    var feedbackId = feedback._id;
    delete feedback.changedData;
    delete feedback._id;

    Feedback.findByIdAndUpdate(
        feedbackId,
        {
            $push: { 'changedData': changedData },
            $set: feedback
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
                res.json(feedback);
            }
        }
    );
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
    console.log('in getDogBreeds');
    DogBreeds.findOne({}, function(err, obj) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(obj);
        }
    });
};

exports.updateDogBreeds = function (req, res) {
    var dogBreeds = req.body;

    DogBreeds.findOne({}, function(err, obj) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var dogBreedsId = obj._id;

            DogBreeds.findByIdAndUpdate(
                dogBreedsId,
                {
                    $push: { 'breeds': dogBreeds }
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
                        res.json(dogBreeds);
                    }
                }
            );
        }
    });
};


exports.dogBreedsById = function (req, res, next, id) {

    console.log('in dog breeds by Id');
    
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

exports.getAllDogFoods = function (req, res) {
    console.log('in getAllDogFoods');
    DogFood.find().sort('name').exec(function (err, foods) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } 
        else {
            res.json(foods);
        }
    });
};

exports.updateDogFood = function (req, res) {
    var dogFood = req.body;

    var changedData = dogFood.changedData;
    var dogFoodId = dogFood._id;
    delete dogFood.changedData;
    delete dogFood._id;

    DogFood.findByIdAndUpdate(
        dogFoodId,
        {
            $push: { 'changedData': changedData },
            $set: dogFood
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
                res.json(dogFood);
            }
        }
    );
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