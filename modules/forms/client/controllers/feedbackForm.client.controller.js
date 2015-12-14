'use strict';

angular.module('forms').controller('feedbackFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'ExitFormsService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, ExitFormsService, PatientsService, ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

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

  }
]);
