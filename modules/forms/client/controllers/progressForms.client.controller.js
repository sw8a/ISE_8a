'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
  function ($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {
    
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currPatient = ActivePatient.getActivePatient();
    $scope.oneAtTime = true;
    $scope.newFormPossible = true;
    $scope.todayWeight;

    if (!$scope.authentication.user) {
        $location.path('/');
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
    $scope.disableField = true;
    $scope.dispEdit = true;

    $scope.isNewFormPossible = function() {
        var pat = ActivePatient.getActivePatient();
        var now = new Date();
        if (pat.progressForms[pat.progressForms.length-1].getDay() == now.getDay() ) {
            return false
        }
        else if (isNewFormPossible) {
            isNewFormPossible = !isNewFormPossible;
            return true;
        }
        return false;
    }

    // Compute the weight loss for that day
    $scope.getTodayWeightLoss = function(todayWeight) {
        var pat = ActivePatient.getActivePatient();
        if (pat.progressForms.length == 0) { 
            return pat.startWeight - todayWeight;
        }
        else {
            return (pat.startWeight - pat.progressForms[pat.progressForms.length - 1].weight) / pat.startWeight;
        }
    }

    // Compute the average weight loss
    $scope.getAvgWeightLoss = function(tWeight) {
        var pat = ActivePatient.getActivePatient();
        if( pat.progressForms.length == 0) { return 0; }
        else {
            // (Today's weight - init weight) / init
            return (pat.startWeight - pat.progressForms[pat.progressForms.length - 1].weight) / pat.progressForms.length;
        }
    }

    // Editing form's input
    $scope.editForm = function() {
        $scope.disableField = false;
        $scope.dispEdit = false;
    }

    // Cancel editing on forms
    $scope.cancelEditing = function() {
        $scope.disableField = true;
        $scope.dispEdit = true;
    }


  }
]);
