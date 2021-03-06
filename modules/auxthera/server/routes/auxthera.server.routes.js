'use strict';

var auxthera = require('../controllers/auxthera.server.controller');


module.exports = function(app) {

    // Auxthera routes
    app.route('/api/auxthera/auxthera')
        .post(auxthera.saveNewAuxthera);

    app.route('/api/auxthera/auxthera/:auxtheraId')
        .get(auxthera.getAuxthera)
        .post(auxthera.saveNewAuxthera)
        .put(auxthera.updateAuxthera);

    // Feedback routes
    app.route('/api/auxthera/feedback')
        .get(auxthera.getFeedback)
        .post(auxthera.saveNewFeedback);

    app.route('/api/auxthera/feedback/:feedbackId')
        .get(auxthera.getFeedback)
        .post(auxthera.saveNewFeedback)
        .put(auxthera.updateFeedback);

    // AuxAdminTasks routes
    app.route('/api/auxthera/auxAdminTasks')
        .post(auxthera.saveNewAuxAdminTasks);

    app.route('/api/auxthera/auxAdminTasks/:auxAdminTasksId')
        .get(auxthera.getAuxAdminTasks)
        .post(auxthera.saveNewAuxAdminTasks)
        .put(auxthera.updateAuxAdminTasks);

    // Dog Breeds routes
    app.route('/api/auxthera/dogBreeds')
        .post(auxthera.saveNewDogBreeds)
        .get(auxthera.getDogBreeds)
        .put(auxthera.updateDogBreeds);
/*
    app.route('/api/auxthera/dogBreeds/:dogBreedsId')
        .get(auxthera.getDogBreeds)
        .post(auxthera.saveNewDogBreeds)
        .put(auxthera.updateDogBreeds);
*/
    // Dog Food routes
    app.route('/api/auxthera/dogFood')
        .post(auxthera.saveNewDogFood)
        .get(auxthera.getAllDogFoods);

    app.route('/api/auxthera/dogFood/:dogFoodId')
        .get(auxthera.getDogFood)
        .post(auxthera.saveNewDogFood)
        .put(auxthera.updateDogFood);


    app.param('auxtheraId', auxthera.auxtheraById);
    //app.param('feedbackId', auxthera.feedbackById);
    app.param('auxAdminTasksId', auxthera.auxAdminTasksById);
    //app.param('dogBreedsId', auxthera.dogBreedsById);
    app.param('dogFoodId', auxthera.dogFoodById);
};
