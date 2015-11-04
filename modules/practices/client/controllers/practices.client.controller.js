'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, PracticesService, $location, $stateParams, ActivePatient) {

        $scope.patients = [];

/*
        var practice = new PracticesService({
            _id: '56342d31eadf1a9d9e4df183'
        });

        practice.$get(function (practiceResponse) {
            ActivePatient.setActivePractice(practiceResponse);

            $scope.patients = practiceResponse.patients;

            console.log(ActivePatient.getActivePractice());
        //});
*/
        $scope.createPractice = function () {
            console.log("In create Practice");
            var practice = new PracticesService({
                name: 'Acme Animal Care',
                address: '123 Street Rd, Nowhere, FL 33333',
                practiceId: 'fakePracticeId'
            });

            practice.$save(function (practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                ActivePatient.setNeedsUpdate();
                console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));
                
                practice = new PracticesService({
                    _id: practiceResponse._id
                });

                practice.$get(function (practiceResponse) {
                    console.log("PR: " + JSON.stringify(practiceResponse, null, 4));
                    ActivePatient.setActivePractice(practiceResponse);

                    console.log("APc2: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                    $scope.patients = practiceResponse.patients;

                    console.log(ActivePatient.getActivePractice());
                });
            });
        };

        $scope.getPractice = function () {
            console.log("In get practice");

            ActivePatient.setNeedsUpdate();
            console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

            ActivePatient.setNeedsUpdate();
            console.log("APt: " + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
        };
    }
]);

/*

'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, PracticesService, $location, $stateParams, ActivePatient) {

        $scope.patients = [];

        var practice = new PracticesService({
            _id: '56342d31eadf1a9d9e4df183'
        });

        practice.$get(function (practiceResponse) {
            ActivePatient.setActivePractice(practiceResponse);

            $scope.patients = practiceResponse.patients;

            console.log(ActivePatient.getActivePractice());
        });


        console.log(ActivePatient.getActivePractice());
    }
]);



*/