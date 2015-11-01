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
                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                console.log(ActivePatient.getActivePractice());
            });
        });
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