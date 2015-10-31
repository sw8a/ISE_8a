'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, PracticesService, $location, $stateParams, ActivePatient) {

        $scope.patients = [];

        var practice = new PracticesService({
            name: 'Acme Animal Care',
            address: '123 Street Rd, Nowhere, FL 33333',
            practiceId: 'fakePracticeId'
        });

        practice.$save(function (practiceResponse) {
            ActivePatient.setActivePractice(practiceResponse);

            $scope.patients = practiceResponse.patients;

            console.log(ActivePatient.getActivePractice());

            /*
            practice = new PracticesService({
                _id: practiceResponse._id
            });

            practice.$get(function (practiceResponse) {
                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                console.log(ActivePatient.getActivePractice());
            });*/
        });


        console.log(ActivePatient.getActivePractice());
    }
]);