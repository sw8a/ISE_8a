'use strict';

angular.module('patients').controller('patientsController', ['$scope', 'Authentication', '$location', '$stateParams', 'PatientsService', 'ActivePatient',
    function ($scope, Authentication, $location, $stateParams, PatientsService, ActivePatient) {

        ActivePatient.setNeedsUpdate();
        console.log("APt: " + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

        ActivePatient.setNeedsUpdate();
        console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

    }
]);