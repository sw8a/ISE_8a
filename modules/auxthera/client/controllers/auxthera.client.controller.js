'use strict';

// using these two commented lines as reference for updating this controller from authentication user controller
//'$scope', '$state', '$http', '$location', '$window', 'Authentication'
//$scope, $state, $http, $location, $window, Authentication
angular.module('auxthera').controller('auxtheraController', ['$scope', '$state', '$http', '$window', 'Authentication', '$location', '$stateParams', 'ActivePatient',
    function($scope, $state, $http, $window, Authentication, $location, $stateParams, ActivePatient) {
        $scope.authentication = Authentication;
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        // Get an eventual error defined in the URL query string:
        $scope.error = $location.search().err;

        $scope.signup = function() {
            console.log($scope.credentials);
            $http.post('/api/auth/signup', $scope.credentials).success(function(response) {
                console.log(response);
                // If successful we assign the response to the global user model
                //$scope.authentication.user = response;
                // refresh the page, the admin may want to create another user
                $state.reload();
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);