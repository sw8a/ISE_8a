'use strict';


angular.module('auxthera').factory('AuxtheraService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/auxthera/:auxtheraId', {
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
            },
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);

angular.module('auxthera').factory('AuxAdminTasksService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/auxAdminTasks/:auxAdminTasksId', {
            auxAdminTasksId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('auxthera').factory('DogBreedsService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/dogBreeds', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('auxthera').factory('DogFoodService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/dogFood/:dogFoodId', {
            dogFoodId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: true
            }

        });
    }
]);