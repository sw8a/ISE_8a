'use strict';

angular.module('forms').controller('feedbackFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'FeedbackService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, FeedbackService, PatientsService, ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();
    $scope.activePractice = ActivePatient.getActivePractice();

    if (!$scope.authentication.user) {
        $location.path('/');
    }


    $scope.initPatient = function() {
        console.log('init patient');
        $scope.activePatient = ActivePatient.getActivePatient();
        $scope.activePractice = ActivePatient.getActivePractice();

        if(!ActivePatient.activePatientSet()) {
          $location.path('/');
        }
    };

    $scope.initPatient();

    $scope.sendContact = function() {

        var feedback = new FeedbackService({
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phone,
            read: false,
            message: $scope.comment,
            practiceId: $scope.activePractice._id,
            auxtheraId: $scope.activePractice.auxthera
        });

        feedback.$save(function(feedbackResponse) {
            
        });
    };

    }
]);
