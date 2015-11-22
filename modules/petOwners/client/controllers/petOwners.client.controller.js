'use strict';

angular.module('petOwners').controller('petOwnersController', ['$scope', 'Authentication', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, $location, $stateParams,  ActivePatient) {
    	$scope.authentication = Authentication;
        if (!$scope.authentication.user) {
        	$location.path('/');
        }
    }
]);
