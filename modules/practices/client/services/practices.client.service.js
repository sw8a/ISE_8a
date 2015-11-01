'use strict';


angular.module('practices').factory('PracticesService', ['$resource',
    function ($resource) {
        return $resource('/api/practices/:practiceId', {
            practiceId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET'
            }
        });
    }
]);