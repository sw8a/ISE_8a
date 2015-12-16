'use strict';

// using these two commented lines as reference for updating this controller from authentication user controller
//'$scope', '$state', '$http', '$location', '$window', 'Authentication'
//$scope, $state, $http, $location, $window, Authentication
angular.module('auxthera').controller('auxtheraController', ['$scope', '$state', '$http', '$window', 'Authentication', 'AuxtheraService', 'ActiveAuxthera', 'AuxAdminTasksService', 'FeedbackService', 'DogFoodService', 'DogBreedsService', '$location', '$stateParams', 'ActivePatient', 'PracticesService', '$sce',
    function($scope, $state, $http, $window, Authentication, AuxtheraService, ActiveAuxthera, AuxAdminTasksService, FeedbackService, DogFoodService, DogBreedsService, $location, $stateParams, ActivePatient, PracticesService, $sce) {
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

        $scope.newAuxthera = false;

        $scope.signUp.username = '';
        $scope.signUp.password = '';

        $scope.signUpError = '';

        $scope.threadActive = false;
        $scope.currThread = {};
        $scope.limitVar = 5;
        $scope.foodHidden = false;
        $scope.breedHidden = false;
        $scope.newMessage = false;

        // Get an eventual error defined in the URL query string:
        // $scope.error = $location.search().err;

        $scope.initAuxthera = function() {

            // var food = new DogFoodService({
            //     name: 'Diamond Puppy',
            //     kcalPerCup: 438,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            // food = new DogFoodService({
            //     name: 'Diamond Original',
            //     kcalPerCup: 317,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            // food = new DogFoodService({
            //     name: 'Diamond Naturals Chicken and Rice',
            //     kcalPerCup: 368,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            // food = new DogFoodService({
            //     name: 'Purina Dog Chow Complete Nutrition',
            //     kcalPerCup: 430,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            // food = new DogFoodService({
            //     name: 'Purina Brand Mainstay',
            //     kcalPerCup: 350,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            // food = new DogFoodService({
            //     name: 'Wysong Vegan',
            //     kcalPerCup: 375,
            //     validated: true
            // });

            // food.$save(function(breedSaveResponse) {
            //     console.log('foodSave: ' + breedSaveResponse);
            // });

            //var foods = new DogFoodService();
            
            //these next few lines implement the analytics
            $http.get('/api/totalPatients').success(function(response) {
                // console.log(response);
                $scope.totalPatients = response;
            }).error(function(response) {
                $scope.error = response.message;
            });

            $http.get('/api/newPatientsThisMonth').success(function(response) {
                // console.log(response);
                $scope.newPatientsThisMonth = response;
            }).error(function(response) {
                $scope.error = response.message;
            });

            $http.get('/api/newPracticesThisMonth').success(function(response) {
                // console.log(response);
                $scope.newPracticesThisMonth = response;
            }).error(function(response) {
                $scope.error = response.message;
            });

            $http.get('/api/totalPractices').success(function(response) {
                // console.log(response);
                $scope.totalPractices = response;
            }).error(function(response) {
                $scope.error = response.message;
            });  

            //console.log(JSON.stringify(DogFoodService.query(), null, 4));
            // var foods = DogFoodService.query(function( getDogFoodsResponse ) {
            //     //console.log(getDogFoodsResponse);
            //     $scope.dogFoods = getDogFoodsResponse;
            //     console.log(JSON.stringify(getDogFoodsResponse, null, 4));
            //     console.log($scope.dogFoods[0].name);
            // });

            // Get the auxthera database document Id from the user credentials and load it
            var auxthera;
            if($scope.authentication.user.auxtheraDocId !== undefined) {
                auxthera = new AuxtheraService({
                    _id: $scope.authentication.user.auxtheraDocId
                });

                auxthera.$get(function(auxtheraResponse) {

                    ActiveAuxthera.setActiveAuxthera(auxtheraResponse);

                    $scope.patients = auxtheraResponse.patients;
                    $scope.auxtheraName = ActiveAuxthera.getActiveAuxthera().name;

                    return;
                });
            }
            // Else should be replaced with redirect to signin for real use
            else {
                return;
            }

               
        };   

            


        $scope.signUp = function() {
            // Form validation
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
                if($scope.practiceSignup.phone === '' || $scope.practiceSignup.phone === undefined) {
                    if(!error) {
                        $scope.signUpError = 'Sign up unsuccessful<br />';
                        $scope.signUpError += 'Error:<br />Practice phone number required<br />';
                        error = true;
                    }
                    else {
                        $scope.signUpError += 'Practice phone number required<br />';
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
            } // End form validation

            if(error) { // if form invalid
                $scope.signUpError = $sce.trustAsHtml($scope.signUpError);
                return;
            }
            else {
                if($scope.accountType === 'practice') {
                    // Create new practice
                    var practice = new PracticesService({
                        name: $scope.practiceSignup.name,
                        address: $scope.practiceSignup.address,
                        practiceId: $scope.practiceSignup.practiceId,
                        email: $scope.practiceSignup.email,
                        phoneNumber: $scope.practiceSignup.phone,
                        auxthera: ActiveAuxthera.getActiveAuxthera()._id
                    });

                    practice.$save(function (practiceResponse) {
                        $scope.signUpCredentials = {
                            username: $scope.signUp.username,
                            password: $scope.signUp.password,
                            roles: 'user',
                            practiceDocId: practiceResponse._id
                        };

                        console.log($scope.signUpCredentials);

                        $http.post('/api/auth/signup', $scope.signUpCredentials).success(function(response) {
                            console.log(response);
                            // If successful we assign the response to the global user model
                            //$scope.authentication.user = response;
                            // refresh the page, the admin may want to create another user
                            $state.reload();
                        }).error(function(response) {
                            $scope.error = response.message;
                        });
                   
                    });
                }
                else {
                    // Creates Auxthera account
                    $scope.signUpCredentials = {
                        username: $scope.signUp.username,
                        password: $scope.signUp.password,
                        roles: 'admin'
                    };

                    if($scope.newAuxthera) {
                        // Creates a new Auxthera account with its own feedback object
                        var auxthera = new AuxtheraService();

                        auxthera.$save(function (auxtheraResponse) {
                            console.log(auxtheraResponse);
                            var auxAdminTasks = new AuxAdminTasksService({
                                auxtheraId: auxtheraResponse._id
                            });

                            auxAdminTasks.$save(function (auxAdminTasksResponse) {
                                auxthera = new AuxtheraService({
                                    _id: auxtheraResponse._id,
                                    adminTasks: auxAdminTasksResponse._id,
                                    addAdminTasks: true
                                });

                                auxthera.$update(function (auxtheraUpdateResponse) {

                                    // Clear form? Reload?

                                });
                            });

                            $scope.signUpCredentials.auxtheraDocId = auxtheraResponse._id;

                            $http.post('/api/auth/signup', $scope.signUpCredentials).success(function(response) {
                                console.log(response);
                                // If successful we assign the response to the global user model
                                // $scope.authentication.user = response;
                                // refresh the page, the admin may want to create another user
                                $state.reload();
                            }).error(function(response) {
                                $scope.error = response.message;
                            });
                        });


                    }
                    
                    else {
                        // Creates new login credentials for current Auxthera account
                        $scope.signUpCredentials.auxtheraDocId = ActiveAuxthera.getActiveAuxthera()._id;

                        $http.post('/api/auth/signup', $scope.signUpCredentials).success(function(response) {
                            console.log(response);
                            // If successful we assign the response to the global user model
                            // $scope.authentication.user = response;
                            // refresh the page, the admin may want to create another user
                            $state.reload();
                        }).error(function(response) {
                            $scope.error = response.message;
                        });

                    }
                }
            }    
        };



        // Initialize list of feedback threads.
        $scope.initFeedback = function() {

            //({ auxtheraId: ActiveAuxthera.getActiveAuxthera()._id })

            FeedbackService.query(function( getFeedbackResponse ) {
                $scope.feedback = getFeedbackResponse;
            });
        };

        //methods changing variables in the feedback page
        $scope.isActive = function(){
            $scope.threadActive = !$scope.threadActive;
        };

        $scope.setCurrent= function(item){
            $scope.currThread = item;
        };

        // Initialize the list of patients to call
        $scope.initCallList = function() {
            // Sample JSON arrary added by Kinderley to test that the program is working properly
            $scope.patientCallList = [
                {index: 0,
                 patientId: '0000',
                 vetId:'KG',
                 lastContact:'May 5, 2015',
                 isOpen: false},
                {index: 1,
                 patientId: '0001',
                 vetId:'KG',
                 lastContact:'May 6, 2015',
                 isOpen: false}
            ];
        };

        $scope.dateCreated = new Date();
        $scope.getActiveCall = function(index){
            $scope.patientCallList[index].isOpen = !$scope.patientCallList[index].isOpen;
            if($scope.patientCallList[index].isOpen === true) {
                for(var i = 0; i !== $scope.patientCallList.length; ++i) {
                    if(i !== index) {
                        $scope.patientCallList[i].isOpen = false;
                    }
                }
            }
        };

        $scope.remove = function(index) {
            console.log('Remove successfully called');
        };
    }
]);

