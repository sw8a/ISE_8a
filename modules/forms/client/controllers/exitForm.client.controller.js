'use strict';

angular.module('forms').controller('exitFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'ExitFormsService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, ExitFormsService, PatientsService,ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

    // User can select for the weight to be dispkayed in kg or lb
    $scope.practiceInfo = {
        preferredUnit: 'kg'
    };

    console.log($scope.authentication);
    if (!$scope.authentication.user) {
        $location.path('/');
    }

    $scope.initPatient = function() {
        $scope.activePatient = ActivePatient.getActivePatient();

        if(!ActivePatient.activePatientSet()) {
          $location.path('/');
        }
    };

    $scope.initPatient();

    // Send the values from the exit form to the database
    $scope.createExitForm = function () {

        var exitForm = new ExitFormsService({
            patient: ActivePatient.getActivePatient()._id,
            endingReason: this.endingReason,
            finalWeight: this.finalWeight,
            finalBCS: this.finalBCS,
            techId: this.techId,
            vetId: this.vetId
        });

        exitForm.$save(function (exitFormResponse) {

            var patient = new PatientsService({
                _id: ActivePatient.getActivePatient()._id,
                exitForm: exitFormResponse._id,
                formSave: true
            });

            patient.$update(function (patientAddFormResponse) {
                ActivePatient.setPatientNeedsUpdate();
                $location.path('/overview');
            });
        });
    };

    // Calculate today's date as a Date object. Set the ending date to today.
    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.endingDate = today;

    // Dog information. Set the BCS
    $scope.patientInfo = {
      startBCS: $scope.activePatient.bcs
    };

    // Return the dog's start weight in kg or lb depending on the user's choice.
    $scope.patientInfo.startWeight = function() {
      if($scope.practiceInfo.preferredUnit === 'kg') {
        return $scope.activePatient.startWeight;
      }
      else {
        return ($scope.activePatient.startWeight * 2.20462).toFixed(2);
      }
    };

    // Calculate the dog's weight loss based on the start weight and the final weight. Return the weight in kg or lb depending on the user choice.
    $scope.patientInfo.weightLossTotal = function () {
        var startWeight = $scope.activePatient.startWeight;
        var finalWeight = $scope.finalWeight;

        if($scope.practiceInfo.preferredUnit === 'kg') {
          return (startWeight - finalWeight).toFixed(2);
        }
        else {
          return ((startWeight * 2.20462 - finalWeight)).toFixed(2);
        }
    };
  }
]);
