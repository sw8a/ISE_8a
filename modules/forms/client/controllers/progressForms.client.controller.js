'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
  function ($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {
    
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currPatient = ActivePatient.getActivePatient();
    $scope.status = {
        isItemOpen: new array(currPatient.progressForms.length);
    }

    // Create new progress form
    $scope.createProgressForm = function () {
        // Create new ProgressForm object

        var progressForm = new ProgressFormsService({
            weight: this.weight,
            trimauxilUse: this.trimauxilUse,
            weightLossAppropriate: this.weightLossAppropriate,
            foodChanged: this.foodChanged,
            comments: this.comments,
            techID: this.techID,
            vetID: this.vetID,
            patient: ActivePatient.getActivePatient()._id
        });

        progressForm.$save(function (progressFormResponse) {
            // Function that is executed after save

            var patient = new PatientsService( {
                _id: ActivePatient.getActivePatient()._id,
                newProgressForm: progressFormResponse._id,
                formSave: true
            });

            patient.$update(function (patientAddFormResponse) {               
                ActivePatient.setPatientNeedsUpdate();
                // Redirect to overview
                $location.path('/overview');
            });
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

    // Variable to enable and disable all fields from users
    $scope.disableFields = true;
    $scope.dispEdit = true;

    // Compute the weight loss for that day
    $scope.getTodayWeightLoss = function(tWeight) {
        if(currPatient.progressForms.length == 0) {
            return 0;
        }
        else {
            return (tWeight < currPatient.progressForms[currPatient.progressForms.length - 1].weight);
        }
    }
    

    // Compute the average weight loss
    $scope.getAvgWeightLoss = function(tWeight) {
        // (Today's weight - Initial weight) / Initial weight 

    }

    // Editing form's input
    $scope.editForm = function() {
        $scope.disableFields = false;
        $scope.dispEdit = false;
    }

    // Cancel editing on forms
    $scope.cancelEditing = function() {
        $scope.disableFields = true;
        $scope.dispEdit = true;
    }


  }
]);
