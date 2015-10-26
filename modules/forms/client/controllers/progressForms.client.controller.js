'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', 'Authentication', 'ProgressForms',
  function ($scope, Authentication, ProgressForms) {
    
    // This provides Authentication context.
    $scope.authentication = Authentication;
    
    // Create new progress form
    $scope.create = function() {
        // Create new ProgressForm object
        console.log("submit calls create");

        var progressForm = new ProgressForm({
            weight: this.weight,
            trimauxilUse: this.trimauxilUse,
            weightLossAppropriate: this.weightLossAppropriate,
            foodChanged: this.foodChanged,
            comments: this.comments,
            techID: this.techID,
            vetID: this.vetID,
            patient: this.patient
        });

        progressForm.$save(function (response) {
            // Function that is executed after save
        });
    };

    


    // Multidimensional array to include priority
    $scope.clients = [{
        petName: "Puddle", 
        clientName: "John Doe",
        phone: "(000) 000-0000",
        contactTime: "12:00AM",
        petInitWeight: "3 lbs",
        petIdealWeight: "2 lbs"
    }];




  }
]);
