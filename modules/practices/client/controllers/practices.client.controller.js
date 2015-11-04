'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', 'PatientsService', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, PracticesService, PatientsService, $location, $stateParams, ActivePatient) {

        $scope.patients = ActivePatient.getActivePractice().patients;

        
        $scope.newPatientClick = function () {
            // Clear active patient
            ActivePatient.setActivePatient({});

            // Go to enrollment form
            $location.path('/enrollmentForm');

        };

        $scope.selectPatient = function (selectedPatient) {
            // Get active patient to populate forms
            var patient = new PatientsService({
                _id: selectedPatient._id,
                populateForms: true
            });
            
            patient.$get(function( selectActivePatientResponse ) {
                ActivePatient.setActivePatient(selectActivePatientResponse);

                // Redirect to overview
                $location.path('/overview');
            });
        };


        $scope.getPractice = function () {

            var practice = new PracticesService({
                _id: '5639a8f129e356c349ff1934'
            });

            practice.$get(function (practiceResponse) {
                
                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                console.log('APc: ' + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                ActivePatient.setPatientNeedsUpdate();
                console.log("APt: " + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
            });

            /*
            // Create new practice
            var practice = new PracticesService({
                name: 'Acme Animal Care',
                address: '123 Street Rd, Nowhere, FL 33333',
                practiceId: 'fakePracticeId'
            });

            practice.$save(function (practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                ActivePatient.setPracticeNeedsUpdate();
                console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));
                
            });
            */
        };
    }
]);
