'use strict';


angular.module('auxthera').factory('AuxtheraService', ['$resource',
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

angular.module('auxthera').factory('FeedbackService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/feedback/:feedbackId', {
            feedbackId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
