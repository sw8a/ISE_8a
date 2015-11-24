'use strict';

<<<<<<< HEAD
angular.module('forms').controller('exitFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'ExitFormsService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, ExitFormsService, PatientsService,ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

    $scope.practiceInfo = {
        preferredUnit: "kg"
    };

    console.log($scope.authentication)
    if (!$scope.authentication.user) {
        $location.path('/');
        console.log($scope.authentication);
    }

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

    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.endingDate = today;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
      startBCS: $scope.activePatient.bcs
    };

    $scope.patientInfo.startWeight = function() {
      if($scope.practiceInfo.preferredUnit === "kg") {
        return $scope.activePatient.startWeight;
      }
      else {
        return ($scope.activePatient.startWeight*2.20462).toFixed(2);
      }
    }

    $scope.patientInfo.weightLossTotal = function () {
        var startWeight = $scope.activePatient.startWeight;
        var finalWeight = $scope.finalWeight;

        if($scope.practiceInfo.preferredUnit === "kg") {
          return (startWeight-finalWeight).toFixed(2);
        }
        else {
          return ((startWeight*2.20462-finalWeight)).toFixed(2);
        }
    };

  }
]);
