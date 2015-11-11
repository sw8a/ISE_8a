'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    if (!$scope.authentication.user) {
      $location.path('/');
    }
  }
]);
