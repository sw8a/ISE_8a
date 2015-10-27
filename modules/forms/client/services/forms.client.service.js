'use strict';

// ProgressForm service used for communicating with the forms REST endpoints
angular.module('forms').factory('ProgressForm', ['$resource',
  function ($resource) {
    return $resource('forms/:progressFormId', {
      formId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
