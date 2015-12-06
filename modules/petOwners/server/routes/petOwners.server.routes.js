'use strict';

var petOwners = require('../controllers/petOwners.server.controller');

module.exports = function(app) {
    
    app.route('/api/petOwners')
        .post(petOwners.saveNewPetOwner);

    app.route('/api/petOwners/:petOwnerId')
        .get(petOwners.getPetOwner)
        .post(petOwners.saveNewPetOwner)
        .put(petOwners.updatePetOwner);


     app.param('petOwnerId', petOwners.petOwnerById);   

};