'use strict';

// This will probably be removed, we won't be storing multiple 'auxtheras'
// but this will be necessary for storing feedback

angular.module('auxthera').factory('auxtheraService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/:auxtheraId', {
            auxtheraId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
