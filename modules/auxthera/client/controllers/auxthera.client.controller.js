'use strict';

angular.module('auxthera').controller('auxtheraController', ['$scope', 'Authentication', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, $location, $stateParams,  ActivePatient) {
    	$scope.authentication = Authentication;
        console.log($scope.authentication)
        if (!$scope.authentication.user) {
        $location.path('/');
        console.log($scope.authentication)
            }


    }
]);