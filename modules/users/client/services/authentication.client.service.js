'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

   /* if auth.user.roles[0] == 'user' {
    	auth.isUser = true

    }*/

    return auth;
  }
]);
