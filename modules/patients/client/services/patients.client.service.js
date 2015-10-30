'use strict';

// Patient service used for communicating with the forms REST endpoints
angular.module('patients').factory('PatientsService', ['$resource',
    function ($resource) {
        return $resource('/api/patients/:patientId', {
            patientId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
