'use strict';

// using these two commented lines as reference for updating this controller from authentication user controller
//'$scope', '$state', '$http', '$location', '$window', 'Authentication'
//$scope, $state, $http, $location, $window, Authentication
angular.module('auxthera').controller('auxtheraController', ['$scope', '$state', '$http', '$window', 'Authentication', '$location', '$stateParams', 'ActivePatient', '$sce',
    function($scope, $state, $http, $window, Authentication, $location, $stateParams, ActivePatient, $sce) {
        $scope.authentication = Authentication;
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.accountType = 'auxthera';

        $scope.practiceSignup = {};
        $scope.signUp = {};

        $scope.practiceSignup.name = '';
        $scope.practiceSignup.address = '';
        $scope.practiceSignup.practiceId = '';
        $scope.practiceSignup.email = '';

        $scope.signUp.username = '';
        $scope.signUp.password = '';

        $scope.signUpError = '';


        // Get an eventual error defined in the URL query string:
        //$scope.error = $location.search().err;

        $scope.signUp = function() {
            var error = false;
            if($scope.accountType === 'practice') {
                if($scope.practiceSignup.name === '' || $scope.practiceSignup.name === undefined) {
                    if(!error) {
                        $scope.signUpError = 'Sign up unsuccessful<br />';
                    }
                    $scope.signUpError += 'Error:<br />Practice name required<br />';
                    error = true;
                }
                if($scope.practiceSignup.address === '' || $scope.practiceSignup.address === undefined) {
                    if(!error) {
                        $scope.signUpError = 'Sign up unsuccessful<br />';
                        $scope.signUpError += 'Error:<br />Practice address required<br />';
                        error = true;
                    }
                    else {
                        $scope.signUpError += 'Practice address required<br />';
                    }  
                }
                if($scope.practiceSignup.email === '' || $scope.practiceSignup.email === undefined) {
                    if(!error) {
                        $scope.signUpError = 'Sign up unsuccessful<br />';
                        $scope.signUpError += 'Error:<br />Practice email required<br />';
                        error = true;
                    }
                    else {
                        $scope.signUpError += 'Practice email required<br />';
                    }  
                }
            }
            if($scope.signUp.username === '' || $scope.signUp.username === undefined) {
                if(!error) {
                    $scope.signUpError = 'Sign up unsuccessful<br />';
                    $scope.signUpError += 'Error:<br />Username required<br />';
                    error = true;
                }
                else {
                    $scope.signUpError += 'Username required<br />';
                }  
            }
            if($scope.signUp.password === '' || $scope.signUp.password === undefined) {
                if(!error) {
                    $scope.signUpError = 'Sign up unsuccessful<br />';
                    $scope.signUpError += 'Error:<br />Password required<br />';
                    error = true;
                }
                else {
                    $scope.signUpError += 'Password required<br />';
                }  
            }

            if(error) {
                $scope.signUpError = $sce.trustAsHtml($scope.signUpError);
                console.log($scope.signUpError);
                return;
            }
            else {
                $http.post('/api/auth/signup', $scope.credentials).success(function(response) {
                    console.log(response);
                    // If successful we assign the response to the global user model
                    //$scope.authentication.user = response;
                    // refresh the page, the admin may want to create another user
                    $state.reload();
                }).error(function(response) {
                    $scope.error = response.message;
                });    
            }    
        };
    }
]);