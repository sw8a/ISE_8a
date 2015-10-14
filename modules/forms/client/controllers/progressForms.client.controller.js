'use strict';

angular.module('core').controller('progressFormsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Multidimensional array to include priority
    $scope.clients = [{
        petName: "Puddle", 
        clientName: "John Doe",
        phone: "(000) 000-0000",
        contactTime: "12:00AM",
        petInitWeight: "3 lbs",
        petIdealWeight: "2 lbs"
    }];
  }
]);
