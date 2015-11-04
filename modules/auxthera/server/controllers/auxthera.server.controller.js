'use strict';


// This code will be utilized for the feedback collection
/*
var path = require('path'),
    mongoose = require('mongoose'),
    PetOwner = mongoose.model('PetOwner'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

exports.saveNewPetOwner = function (req, res) {
    var petOwner = new PetOwner(req.body);

    petOwner.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(petOwner);
        }
    });
};

exports.getPetOwner = function (req, res) {
    res.json(req.petOwner);
};


exports.petOwnerById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'petOwner Id is invalid'
        });
    }

    PetOwner.findById(id, function (err, foundPetOwner) {
        if (err) {
            return next(err);
        } 
        else if (!foundPetOwner) {
            return res.status(404).send({
                message: 'No petOwner found'
            });
        }
        req.petOwner = foundPetOwner;
        next();
    });



};

*/