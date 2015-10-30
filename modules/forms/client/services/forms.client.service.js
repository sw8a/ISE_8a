'use strict';

// ProgressForm service used for communicating with the forms REST endpoints
angular.module('forms').factory('ProgressFormsService', ['$resource',
    function ($resource) {
        return $resource('/api/forms/progressForm/:progressFormId', {
            progressFormId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('forms').factory('EnrollmentFormsService', ['$resource',
    function ($resource) {
        return $resource('/api/forms/enrollmentForm/:enrollmentFormId', {
            enrollmentFormId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('forms').factory('ExitFormsService', ['$resource',
    function ($resource) {
        return $resource('/api/forms/exitForm/:exitFormId', {
            exitFormId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);