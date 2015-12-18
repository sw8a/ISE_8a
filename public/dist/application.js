'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
  function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(["$rootScope", "$state", "Authentication", function ($rootScope, $state, Authentication) {
  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        $state.go('authentication.signin', {}, {
          notify: false
        }).then(function () {
          $rootScope.$broadcast('$stateChangeSuccess', 'authentication.signin', {}, toState, toParams);
        });
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = {
      state: fromState,
      params: fromParams,
      href: $state.href(fromState, fromParams)
    };
  });
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

ApplicationConfiguration.registerModule('auxthera');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('forms');

'use strict';


// Use Applicaion configuration module to register the module
ApplicationConfiguration.registerModule('patients');
ApplicationConfiguration.registerModule('ngStorage');
'use strict';

ApplicationConfiguration.registerModule('petOwners');
'use strict';

ApplicationConfiguration.registerModule('practices');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

'use strict';

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


'use strict';

angular.module('auxthera').service('ActiveAuxthera', ['AuxtheraService',
    function(AuxtheraService) {

        
        var activeAuxthera = {};
        var auxtheraNeedsUpdate = false;


        return {
            setActiveAuxthera: function(auxtheraToSet) {
                // Takes in an object and makes that the active Auxthera 
                //  ~ no checking to make sure it is a valid Auxthera
                activeAuxthera = auxtheraToSet;
                return activeAuxthera;
            },

            getActiveAuxthera: function() {
                // Returns the active auxthera unless an update has been requested at which point it will get the latest version of the current active auxthera from the database
                if(auxtheraNeedsUpdate) {
                    auxtheraNeedsUpdate = false;
                    var auxthera = new AuxtheraService({
                        _id: activeAuxthera._id
                    });
                    
                    auxthera.$get(function( updateActiveAuxtheraResponse ) {
                        activeAuxthera = updateActiveAuxtheraResponse;
                        return activeAuxthera;
                    });
                }
                else {
                    return activeAuxthera;
                }
            },

            setAuxtheraNeedsUpdate: function() {
                // Request an update the next time getActiveAuxthera is called
                auxtheraNeedsUpdate = true;
            },

            updateActiveAuxthera: function() {
                // Similar to getActiveAuxthera but will always get the latest version from the database
                var auxthera = new AuxtheraService({
                    _id: activeAuxthera._id,
                    populateForms: true
                });
                
                auxthera.$get(function( updateActiveAuxtheraResponse ) {
                    activeAuxthera = updateActiveAuxtheraResponse;
                    auxtheraNeedsUpdate = false;
                    return activeAuxthera;
                });
            },

            activeAuxtheraSet: function() {
                console.log(activeAuxthera);
                if(activeAuxthera._id === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
    }
]);

'use strict';


angular.module('auxthera').factory('AuxtheraService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/auxthera/:auxtheraId', {
            auxtheraId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('auxthera').factory('FeedbackService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/feedback/:feedbackId', {
            feedbackId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);

angular.module('auxthera').factory('AuxAdminTasksService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/auxAdminTasks/:auxAdminTasksId', {
            auxAdminTasksId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('auxthera').factory('DogBreedsService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/dogBreeds', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('auxthera').factory('DogFoodService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/dogFood/:dogFoodId', {
            dogFoodId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: true
            }

        });
    }
]);
'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
]);

'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise('not-found');
        // Home state routing
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'content': {
                        template: '<div ui-view></div>',
                        controller: ["$state", "Authentication", function($state, Authentication) {

                            // Warnings for == must remain, === will not work

                            // if user is an admin route to their home page
                            if (Authentication.user.roles == 'admin') {
                                $state.go('auxOverview');
                            }
                            // otherwise if they are a user, route to that homepage
                            else if (Authentication.user.roles == 'user') {
                                $state.go('vetHomepage');
                            }
                            //otherwise just go to the signin page, no one is signed in
                            else {
                                $state.go('signin');
                            }
                        }]
                    }
                }
            })

            .state('not-found', {
                url: '/not-found',
                views: {
                    'content': {
                        templateUrl: 'modules/core/views/404.client.view.html'
                    }
                }
            })
            .state('overview', {
                url: '/overview',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/patients/views/overview.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('progressForms', {
                url: '/progressForms',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/progressForms.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('enrollmentForm', {
                url: '/enrollmentForm',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/enrollmentForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('vetFeedback', {
                url: '/vetFeedback',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/feedbackForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('exitForm', {
                url: '/exitForm',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/sidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/forms/views/exitForm.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('vetHomepage', {
                url: '/vetHome',
                views: {
                    'content': {
                        templateUrl: 'modules/practices/views/vetHomepage.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })
            .state('inactivePatientList', {
                url: '/inactivePatientList',
                views: {
                    'content': {
                        templateUrl: 'modules/practices/views/inactivePatientList.client.view.html'
                    }
                },
                data: {
                    roles: ['user']
                }
            })


            // begin adding new states from users routes folder
            .state('settings', {
                abstract: true,
                url: '/settings',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/settings.client.view.html'
                    }
                },
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('settings.profile', {
                url: '/profile',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
                    }
                }
            })
            .state('settings.password', {
                url: '/password',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/change-password.client.view.html'
                    }
                }
            })
            .state('settings.accounts', {
                url: '/accounts',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html'
                    }
                }
            })
            .state('settings.picture', {
                url: '/picture',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html'
                    }
                }
            })
            .state('signup', {
                url: '/signup',

                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxSignUp.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('signin', {
                url: '/signin?err',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/authentication/signin.client.view.html'
                    }
                }
            })

            // getting rid of this abstract state makes life easier
            // now we can access the forgot password page, state is defined right below these comments
            // .state('password', {
            //   abstract: true,
            //   url: '/password',
            //   template: '<ui-view/>'
            // })
            // this is for the forgot password state, got rid of password. abstract state
            // should go ahead and modify the rest of the abstract state stuff as well!
            .state('forgot', {
                url: '/forgot',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
                    }
                }
            })
            .state('password.reset', {
                abstract: true,
                url: '/reset',
                template: '<ui-view/>'
            })
            .state('password.reset.invalid', {
                url: '/invalid',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
                    }
                }
            })
            .state('password.reset.success', {
                url: '/success',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
                    }
                }
            })
            .state('password.reset.form', {
                url: '/:token',
                views: {
                    'content': {
                        templateUrl: 'modules/users/views/password/reset-password.client.view.html'
                    }
                }
            })

            //begin adding routes for AuxThera view
            .state('auxOverview', {
                url: '/auxOverview',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxOverview.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxFeedback', {
                url: '/auxFeedback',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxFeedback.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxCallList', {
                url: '/auxCallList',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxCallList.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            })
            .state('auxUpdates', {
                url: '/auxUpdates',
                views: {
                    'sidebar': {
                        templateUrl: '/modules/core/views/auxSidebar.client.view.html'
                    },
                    'content': {
                        templateUrl: 'modules/auxthera/views/auxUpdates.client.view.html'
                    }
                },
                data: {
                    roles: ['admin']
                }
            });
    }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$location', 
  function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
    function($scope, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        if (!$scope.authentication.user) {
            $location.path('/');
        }
    }
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? true : options.isPublic),
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.menus[menuId].isPublic : options.isPublic),
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].roles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.link, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : options.isPublic),
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar', {
      isPublic: false
    });
  }
]);

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

'use strict';
/*'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',
  function ($stateProvider) {
    /*
    // Articles state routing
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      });
	
  }
]);*/
'use strict';

angular.module('forms').controller('enrollmentFormController', ['$scope', 'Authentication', '$location', '$stateParams', '$window', 'EnrollmentFormsService', 'PatientsService', 'PracticesService', 'PetOwnersService', 'DogBreedsService', 'DogFoodService', 'ActivePatient',
    function($scope, Authentication, $location, $stateParams, $window, EnrollmentFormsService, PatientsService, PracticesService, PetOwnersService, DogBreedsService, DogFoodService, ActivePatient) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // If the user is not logged in, redirect
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatient = ActivePatient.getActivePatient();
        //console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
        //console.log('APt: ' + JSON.stringify($scope.activePatient, null, 4));

        // List of dog breeds already in database
        $scope.dogBreeds = [];
        $scope.dogFoods = [];
        $scope.dogFoodNames = [];          

        // Get the values from the form to be sent to the database
        if(ActivePatient.activePatientSet()) {
            $scope.disableInput = true;
            $scope.vetApproval = true;

            $scope.dateCreated = new Date($scope.activePatient.enrollmentForm.dateCreated);
            $scope.firstName = $scope.activePatient.firstName;
            $scope.patientId = $scope.activePatient.patientId;

            $scope.clientLastName = $scope.activePatient.petOwner.lastName;
            $scope.clientFirstName = $scope.activePatient.petOwner.firstName;
            $scope.clientTelephone = $scope.activePatient.petOwner.phoneNumber;
            $scope.clientEmail = $scope.activePatient.petOwner.email;
            $scope.confirmEmail = $scope.activePatient.petOwner.email;
            $scope.contactAuthorized = $scope.activePatient.petOwner.contactAuthorized;

            $scope.mealsPerDay = $scope.activePatient.enrollmentForm.mealsPerDay;
            $scope.cupsPerMeal = $scope.activePatient.enrollmentForm.cupsPerMeal;

            $scope.birthDate = new Date($scope.activePatient.birthDate);
            $scope.startWeight = $scope.activePatient.startWeight;
            $scope.startWeightLb = ($scope.activePatient.startWeight * 2.2046).toFixed(2)-0;

            $scope.sex = $scope.activePatient.sex;
            $scope.fixed = $scope.activePatient.fixed;
            $scope.breed = $scope.activePatient.breed;
            $scope.bcs = $scope.activePatient.bcs;

            $scope.treats = $scope.activePatient.enrollmentForm.treats;
            $scope.currentMedications = $scope.activePatient.enrollmentForm.currentMedications;
            $scope.medicalHistory = $scope.activePatient.enrollmentForm.medicalHistory;
            $scope.peFindings = $scope.activePatient.enrollmentForm.peFindings;
            $scope.vetSig = $scope.activePatient.enrollmentForm.vetSig;
            $scope.techId = $scope.activePatient.enrollmentForm.techId;
            $scope.vetId = $scope.activePatient.enrollmentForm.vetId;
        }
        else {
            $scope.disableInput = false;
            $scope.dateCreated = new Date();
        }

        $scope.editActive = false;

        // This function allows the form to be edited
        $scope.editForm = function() {
            $scope.disableInput = false;
            $scope.editActive = true;
            $scope.vetApproval = true;
        };

        // This function prevents the form from being edited
        $scope.cancelEdit = function() {
            $scope.disableInput = true;
            $scope.editActive = false;
        };

        // Save changes that were made in the form
        $scope.saveEdit = function() {
            var changedDataPatient = {
                _id: $scope.activePatient._id
            };
            var oldDataPatient = {};
            var patientChanged = false;

            var changedDataForm = {
                _id: $scope.activePatient.enrollmentForm._id
            };
            var oldDataForm = {};
            var formChanged = false;

            var changedDataOwner = {
                _id: $scope.activePatient.petOwner._id
            };
            var oldDataOwner = {};
            var ownerChanged = false;

            if($scope.patientId !== $scope.activePatient.patientId) {
                changedDataPatient.patientId = $scope.patientId;
                oldDataPatient.patientId = $scope.activePatient.patientId;
                patientChanged = true;
            }
            if($scope.firstName !== $scope.activePatient.firstName) {
                changedDataPatient.firstName = $scope.firstName;
                oldDataPatient.firstName = $scope.activePatient.firstName;
                patientChanged = true;
            }

            if($scope.clientLastName !== $scope.activePatient.petOwner.lastName) {
                changedDataOwner.lastName = $scope.clientLastName;
                oldDataOwner.lastName = $scope.activePatient.petOwner.lastName;
                ownerChanged = true;
            }
            if($scope.clientLastName !== $scope.activePatient.petOwner.lastName) {
                changedDataOwner.lastName = $scope.clientLastName;
                oldDataOwner.lastName = $scope.activePatient.petOwner.lastName;
                ownerChanged = true;
            }
            if($scope.clientFirstName !== $scope.activePatient.petOwner.firstName) {
                changedDataOwner.firstName = $scope.clientFirstName;
                oldDataOwner.firstName = $scope.activePatient.petOwner.firstName;
                ownerChanged = true;
            }
            if($scope.clientTelephone !== $scope.activePatient.petOwner.phoneNumber) {
                changedDataOwner.phoneNumber = $scope.clientTelephone;
                oldDataOwner.phoneNumber = $scope.activePatient.petOwner.phoneNumber;
                ownerChanged = true;
            }
            if($scope.clientEmail !== $scope.activePatient.petOwner.email) {
                changedDataOwner.email = $scope.clientEmail;
                oldDataOwner.email = $scope.activePatient.petOwner.email;
                ownerChanged = true;
            }

            if($scope.startWeight !== $scope.activePatient.startWeight) {
                changedDataPatient.startWeight = $scope.startWeight;
                oldDataPatient.startWeight = $scope.activePatient.startWeight;
                patientChanged = true;
            }
            if($scope.sex !== $scope.activePatient.sex) {
                changedDataPatient.sex = $scope.sex;
                oldDataPatient.sex = $scope.activePatient.sex;
                patientChanged = true;
            }
            if($scope.fixed !== $scope.activePatient.fixed) {
                changedDataPatient.fixed = $scope.fixed;
                oldDataPatient.fixed = $scope.activePatient.fixed;
                patientChanged = true;
            }
            if($scope.breed !== $scope.activePatient.breed) {
                changedDataPatient.breed = $scope.breed;
                oldDataPatient.breed = $scope.activePatient.breed;
                patientChanged = true;
            }
            if($scope.bcs !== $scope.activePatient.bcs) {
                changedDataPatient.bcs = $scope.bcs;
                oldDataPatient.bcs = $scope.activePatient.bcs;
                patientChanged = true;
            }

            if($scope.treats !== $scope.activePatient.enrollmentForm.treats) {
                changedDataForm.treats = $scope.treats;
                oldDataForm.treats = $scope.activePatient.enrollmentForm.treats;
                formChanged = true;
            }
            if($scope.currentMedications !== $scope.activePatient.enrollmentForm.currentMedications) {
                changedDataForm.currentMedications = $scope.currentMedications;
                oldDataForm.currentMedications = $scope.activePatient.enrollmentForm.currentMedications;
                formChanged = true;
            }
            if($scope.medicalHistory !== $scope.activePatient.enrollmentForm.medicalHistory) {
                changedDataForm.medicalHistory = $scope.medicalHistory;
                oldDataForm.medicalHistory = $scope.activePatient.enrollmentForm.medicalHistory;
                formChanged = true;
            }
            if($scope.peFindings !== $scope.activePatient.enrollmentForm.peFindings) {
                changedDataForm.peFindings = $scope.peFindings;
                oldDataForm.peFindings = $scope.activePatient.enrollmentForm.peFindings;
                formChanged = true;
            }
            if($scope.vetSig !== $scope.activePatient.enrollmentForm.vetSig) {
                changedDataForm.vetSig = $scope.vetSig;
                oldDataForm.vetSig = $scope.activePatient.enrollmentForm.vetSig;
                formChanged = true;
            }
            if($scope.techId !== $scope.activePatient.enrollmentForm.techId) {
                changedDataForm.techId = $scope.techId;
                oldDataForm.techId = $scope.activePatient.enrollmentForm.techId;
                formChanged = true;
            }
            if($scope.vetId !== $scope.activePatient.enrollmentForm.vetId) {
                changedDataForm.vetId = $scope.vetId;
                oldDataForm.vetId = $scope.activePatient.enrollmentForm.vetId;
                formChanged = true;
            }

            if(patientChanged) {
                changedDataPatient.changedData = oldDataPatient;
                var patient = new PatientsService(changedDataPatient);
                console.log('patient edit:');
                console.log(patient);
                console.log(changedDataPatient);
                patient.$update(function(patientUpdateResponse) {});
            }
            if(formChanged) {
                changedDataForm.changedData = oldDataForm;
                var enrollmentForm = new EnrollmentFormsService(changedDataForm);
                console.log('enrollmentForm edit:');
                console.log(enrollmentForm);
                console.log(changedDataForm);
                enrollmentForm.$update(function(enrollmentFormUpdateResponse) {});
            }
            if(ownerChanged) {
                changedDataOwner.changedData = oldDataOwner;
                var petOwner = new PetOwnersService(changedDataOwner);
                petOwner.$update(function(petOwnerUpdateResponse) {});
            }

            ActivePatient.setPatientNeedsUpdate();
        };

        // Calculate today's date as a Date object. Set todayDate date to today.
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDate();
        var year = today.getFullYear();
        today = new Date(year, month, day);
        $scope.todayDate = today;

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();

            var breeds = new DogBreedsService();
            
            breeds.$get(function( getDogBreedsResponse ) {
                $scope.dogBreeds = getDogBreedsResponse.breeds;
                for(var i = 0; i < $scope.dogBreeds.length; i++) {
                    $scope.dogBreeds[i].index = i;
                }
            });

            var foods = DogFoodService.query(function( getDogFoodsResponse ) {
                //console.log(getDogFoodsResponse);
                $scope.dogFoods = getDogFoodsResponse;
                for(var i = 0; i < $scope.dogFoods.length; i++) {
                    $scope.dogFoods[i].index = i;
                    $scope.dogFoodNames[i] = $scope.dogFoods[i].name;
                }

            });
        };


        // Purpose:     This function retrieve all the information regarding a particular food
        //              based on the food name. The retrieved information filled out on the form
        //              kcal/cup and kcal/kg if applicable
        // Parameters:  String representation of food name
        // Return:      kcal/cup
        $scope.getFoodInfo = function(foodName) {
            var i = $scope.dogFoodNames.indexOf(foodName);
            // Set scope variable if element is found
            if(i !== -1) {
                return $scope.dogFoods[i].kcalPerCup;
            }
            return undefined;  // Food is not in database
        };

        // Purpose:     This function serves as a workaround the issue of bootstrap typeahead
        //              directive not modeling the bootstrap directive
        $scope.formatLabel = function(model) {
            console.log('Format Label, model: ' + model);
            var ans = '';
            if(model === '') {
                ans = '';
            }
            // If a number is passed, then user select a previously defined function
            else if(!isNaN(model)) {
                        ans = $scope.dogFoods[model].name;
            }
            else {
                ans = model;
            }

            // For call from past edited form and new form
            console.log('ans: ' + ans);
            $scope.foodBrand = ans;
            $scope.foodkCal = $scope.getFoodInfo(ans);
            return ans;
        };


        // Create the enrollment form by sending the form values to the database
        $scope.createEnrollmentForm = function() {

            var dogFoodId;

            for(var i = 0; i < $scope.dogFoods.length; i++) {
                if($scope.foodBrand === $scope.dogFoods[i].name) {
                    dogFoodId = $scope.dogFoods[i]._id;
                    break;
                }
            }

            if(dogFoodId === undefined || dogFoodId === null) {
                var food = new DogFoodService({
                    name: $scope.foodBrand,
                    kcalPerCup: $scope.foodkCal,
                    validated: false
                });

                food.$save(function(breedSaveResponse) {
                    dogFoodId = breedSaveResponse;
                });
            }

            var patient = new PatientsService({
                firstName: this.firstName,
                patientId: this.patientId,
                birthDate: this.birthDate,
                sex: this.sex,
                fixed: this.fixed,
                breed: this.breed,
                startWeight: this.startWeight,
                bcs: this.bcs,
                food: dogFoodId,
                practice: ActivePatient.getActivePractice()._id
            });

            var petOwner = new PetOwnersService({
                firstName: $scope.clientFirstName,
                lastName: $scope.clientLastName,
                phoneNumber: $scope.clientTelephone,
                email: $scope.clientEmail,
                contactAuthorized: $scope.contactAuthorized,
                practice: ActivePatient.getActivePractice()._id
            });

            var enrollmentForm = new EnrollmentFormsService({
                dateCreated: $scope.dateCreated,
                mealsPerDay: $scope.mealsPerDay,
                cupsPerMeal: $scope.cupsPerMeal,
                treats: this.treats,
                currentMedications: this.currentMedications,
                medicalHistory: this.medicalHistory,
                peFindings: this.peFindings,
                vetSig: this.vetSig,
                techId: this.techId,
                vetId: this.vetId
            });

            patient.$save(function(patientResponse) {
                ActivePatient.setActivePatient(patientResponse);

                var practice = new PracticesService({
                    _id: ActivePatient.getActivePractice()._id,
                    newPatient: patientResponse._id
                });

                practice.$update(function(updatePracticeResponse) {
                    ActivePatient.updateActivePractice();
                });

                enrollmentForm.patient = patientResponse._id;
                petOwner.pet = patientResponse._id;

                petOwner.$save(function(petOwnerResponse) {
                    enrollmentForm.$save(function(enrollmentFormResponse) {
                        patient = new PatientsService({
                            _id: patientResponse._id,
                            enrollmentForm: enrollmentFormResponse._id,
                            petOwner: petOwnerResponse._id,
                            formSave: true
                        });

                        patient.$update(function(patientAddFormResponse) {
                            var patient = new PatientsService({
                                _id: patientAddFormResponse._id
                            });

                            ActivePatient.updateActivePatient();

                            // Wait until the active patient has been updated. Current setup is not ideal
                            setTimeout(function(){
                                if(ActivePatient.getActivePatient().firstName) {
                                    $location.path('/overview');
                                }
                                else {
                                    setTimeout(function(){ $location.path('/overview'); }, 100);
                                }
                            }, 100);

                        });
                    });
                });
            });
        };

        // Set patient info
        $scope.patientInfo = {
            DOB: new Date(2013, 9, 22)
        };

        $scope.patientInfo.age = function () {
            if($scope.birthDate !== undefined) {
                var DOB = $scope.birthDate; //$scope.activePatient.birthDate
                var age = $scope.yearDifference({year: DOB.getFullYear(), month: DOB.getMonth() + 1, day: DOB.getDate()});
                return age;
            }
            else {
                return '';
            }
        };

        // Calculate the patient's ideal weight based on Trimauxil formula
        $scope.patientInfo.idealWeight = function () {
            var currWeight;
            var bodyFat;
            var idealWeight;

            if($scope.disableInput) {
                currWeight = $scope.activePatient.startWeight;
                bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
                idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

                return idealWeight.toFixed(2);
            }
            else {
                currWeight = $scope.startWeight;
                bodyFat = $scope.bcs * 5; // Assumes each BCS equals 5% body fat
                idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

                return idealWeight.toFixed(2);
            }
        };

        // Calculates the ideal cups per feeding (based on Trimauxil formula)
        $scope.patientInfo.cupsPerFeeding = function () {
            var dailykCalIdealWeight = 600; // Use Recommended Daily Caloric Intake for Ideal Weight Chart
            var kCalPerCup = 150; // Eventually need to find on food database
            var cupsPerDay = dailykCalIdealWeight/kCalPerCup;
            var perDay = $scope.patientInfo.perDay;
            var cupsPerFeeding = cupsPerDay/perDay;

            return cupsPerFeeding.toFixed(2);
        };

        // Calculates the difference, in years, between two dates
        $scope.yearDifference = function (date) {
            var curDate = new Date(),
                now     = {
                  year: curDate.getUTCFullYear(),
                  // UTC month value is zero-based
                  month: curDate.getUTCMonth() + 1,
                  day: curDate.getUTCDate()
                },
                diff = now.year % date.year;

            // Do not update the date unless it is time
            if (now.month < date.month || now.month === date.month && now.day < date.day) {
              diff -= 1;
            }

            return diff;
        };

        // Convert a lb weight to kg
        $scope.lbToKg = function(lbWeight) {
            return (lbWeight / 2.2046).toFixed(2);
        };
        // Convert a kg weight to lb
        $scope.kgToLb = function(kgWeight) {
            return (kgWeight * 2.2046).toFixed(2);
        };

        $scope.checkEmail = function () {
          $scope.myForm.confirmEmail.$error.dontMatch = $scope.clientEmail !== $scope.confirmEmail;
        };
    }
]);

'use strict';

angular.module('forms').controller('exitFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'ExitFormsService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, ExitFormsService, PatientsService,ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

    if (!$scope.authentication.user) {
        $location.path('/');
    }

    $scope.initPatient = function() {
        $scope.activePatient = ActivePatient.getActivePatient();

        if(!ActivePatient.activePatientSet()) {
          $location.path('/');
        }
    };

    $scope.initPatient();

    // Send the values from the exit form to the database
    $scope.createExitForm = function () {

        var exitForm = new ExitFormsService({
            patient: ActivePatient.getActivePatient()._id,
            endingReason: this.endingReason,
            finalWeight: this.finalWeight,
            finalBCS: this.finalBCS,
            techId: this.techId,
            vetId: this.vetId
        });

        exitForm.$save(function (exitFormResponse) {

            var patient = new PatientsService({
                _id: ActivePatient.getActivePatient()._id,
                exitForm: exitFormResponse._id,
                formSave: true
            });

            patient.$update(function (patientAddFormResponse) {
                ActivePatient.setPatientNeedsUpdate();
                $location.path('/overview');
            });
        });
    };

    // Calculate today's date as a Date object. Set the ending date to today.
    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.endingDate = today;

    // Dog information. Set the BCS
    $scope.patientInfo = {
      startBCS: $scope.activePatient.bcs
    };

    // Calculate the dog's weight loss based on the start weight and the final weight. Return the weight in kg or lb depending on the user choice.
    $scope.patientInfo.weightLossTotal = function (unit) {
        var startWeight = $scope.activePatient.startWeight;
        var finalWeight = $scope.finalWeight;
        var finalWeightLB = $scope.finalWeightLB;

        if(unit === 'kg') {
          return (startWeight - finalWeight).toFixed(2);
        }
        else {
          return ((startWeight * 2.20462) - finalWeightLB).toFixed(2);
        }
    };

    // Convert a kg weight to lb
    $scope.kgToLb = function(kgWeight) {
        return (kgWeight * 2.2046).toFixed(2);
    };
    // Convert a lb weight to kg
    $scope.lbToKg = function(lbWeight) {
        return (lbWeight / 2.2046).toFixed(2);
    };
  }
]);

'use strict';

angular.module('forms').controller('feedbackFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'FeedbackService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, FeedbackService, PatientsService, ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();
    $scope.activePractice = ActivePatient.getActivePractice();

    if (!$scope.authentication.user) {
        $location.path('/');
    }


    $scope.initPatient = function() {
        console.log('init patient');
        $scope.activePatient = ActivePatient.getActivePatient();
        $scope.activePractice = ActivePatient.getActivePractice();

        if(!ActivePatient.activePatientSet()) {
          $location.path('/');
        }
    };

    $scope.initPatient();

    $scope.sendContact = function() {

        var feedback = new FeedbackService({
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phone,
            read: false,
            message: $scope.comment,
            practiceId: $scope.activePractice._id,
            auxtheraId: $scope.activePractice.auxthera
        });

        feedback.$save(function(feedbackResponse) {
            
        });
    };

    }
]);

'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'DogFoodService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, DogFoodService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true;                                        // To allow one form to open at a time
        $scope.enterFood = false;                                       // Use to give user the options to enter food info
        $scope.feedAdjustFlag = false;                                  // Flag use to override feeding adjustment in new form 
        $scope.constProgForm = [];                                      // Empty array to store progress form before it is changed
        $scope.dateCreated = new Date();                                // Today's date for new forms
        $scope.foodBrand = '';                                       // Use for user's food selection
        $scope.dogFoodNames = [];

        // Fields for use in automatic conversion when entering weight in New progress form
        $scope.weight = {
            lb: '',
            kg: ''
        };


        if (!$scope.authentication.user) {
            $location.path('/');
        }

        // Purpose:     Check if all visit forms shoulc be locked from edititing
        //              based on 60 days after exit form has been completed
        // Paramters:   None
        // Return:      Bool
        $scope.formsLockedFromEditing = function() {
            var pat = ActivePatient.getActivePatient();
            if(pat.exitForm !== undefined) {
                var today = Date();
                var exitDate = $scope.toDate(pat.exitForm.dateCreated);
                if($scope.getNumDays(exitDate, today) === 60) {
                    return true;
                }
            }
            return false;
        };


        // Create new progress form
        $scope.createProgressForm = function() {
            // Create new ProgressForm object

            if($scope.foodChanged) {
                var dogFoodId;

                for(var i = 0; i < $scope.dogFoods.length; i++) {
                    if($scope.foodBrand === $scope.dogFoods[i].name) {
                        dogFoodId = $scope.dogFoods[i]._id;
                        break;
                    }
                }

                if(dogFoodId === undefined || dogFoodId === null) {
                    var food = new DogFoodService({
                        name: $scope.foodBrand,
                        kcalPerCup: $scope.foodkCal,
                        validated: false
                    });

                    food.$save(function(breedSaveResponse) {
                        dogFoodId = breedSaveResponse;

                        var patient = new PatientsService({
                            _id: ActivePatient.getActivePatient()._id,
                            food: dogFoodId,
                            changedData: {
                                food: ActivePatient.getActivePatient().food
                            }
                        });
                    });
                }
            }

            var progressForm = new ProgressFormsService({
                weight: this.weight.kg,
                trimauxilUse: this.trimauxilUse,
                weightLossAppropriate: this.weightLossAppropriate,
                overrideCupsPerFeeding: this.overrideCupsPerFeeding,
                vetIdOverrideCPF: this.vetIdOverrideCPF,
                foodChanged: this.foodChanged,
                comments: this.comments,
                techId: this.techId,
                vetId: this.vetId,
                dateCreated: this.dateCreated,
                patient: ActivePatient.getActivePatient()._id
            });

            progressForm.$save(function(progressFormResponse) {
                // Function that is executed after save

                var patient = new PatientsService({
                    _id: ActivePatient.getActivePatient()._id,
                    newProgressForm: progressFormResponse._id,
                    formSave: true
                });

                patient.$update(function(patientAddFormResponse) {
                    ActivePatient.setPatientNeedsUpdate();
                    // Redirect to overview
                    $location.path('/overview');
                });
            });
        };

        // Update progress Forms
        $scope.updateProgressForm = function(index) {
            
            console.log('Update Progress Form');
            var changedData = {
                _id:  $scope.activePatient.progressForms[index]._id
            };  // Object containing old values before the fields were changed
            var oldData = {};
            var formChanged = false; // Flag to check if any field was changed

            

            // Add fields changed to Progress Form service
            if($scope.constProgForm[index].weight.weightKg !== $scope.activePatient.progressForms[index].weightKg-0) {
                oldData.weight = $scope.constProgForm[index].weight.weightKg;
                changedData.weight = $scope.activePatient.progressForms[index].weightKg-0;
                $scope.activePatient.progressForms[index].weight = changedData.weight;
                formChanged = true;
                //this.activePatient.progressForms[index].weight = this.activePatient.progressForms[index].weightKg;
            }
            // Trimauxil Use
            if($scope.constProgForm[index].trimauxilUse !== $scope.activePatient.progressForms[index].trimauxilUse) {
                oldData.trimauxilUse = $scope.constProgForm[index].trimauxilUse;
                changedData.trimauxilUse = $scope.activePatient.progressForms[index].trimauxilUse;
                formChanged = true;
            }
            /* Assess this
            // Feeding adjustment needed edited
            if(this.activePatient.progressForms[index].feedAdjustmentFlag === true){
                changedData.overrideCupsPerFeeding = $scope.constProgForm[index].overrideCupsPerFeeding;
                changedData.vetIdOverrideCPF = $scope.constProgForm[index].vetIdOverrideCPF;
                oldData.overrideCupsPerFeeding = this.activePatient.progressForms[index].overrideCupsPerFeeding;
                oldData.overrideCupsPerFeeding = this.activePatient.progressForms[index].vetIdOverrideCPF;
                formChanged = true;
            }*/
            // Food changed edited
            if($scope.constProgForm[index].foodChanged !== $scope.activePatient.progressForms[index].foodChanged) {
                oldData.foodChanged = $scope.constProgForm[index].foodChanged;
                changedData.foodChanged = $scope.activePatient.progressForms[index].foodChanged;
                formChanged = true;
                // New food information needed?
                if(this.activePatient.progressForms[index].foodChanged === true) {
                    // Add new kcal/cup and kcal/kg to food collection
                    console.log('Update the food database with the new food information');
                }
            }
            // Comments edited
            if($scope.constProgForm[index].comments !== $scope.activePatient.progressForms[index].comments) {
                oldData.comments = $scope.constProgForm[index].comments;
                changedData.comments = $scope.activePatient.progressForms[index].comments;
                formChanged = true;
            }
            // Tech ID edited
            if($scope.constProgForm[index].techID !== $scope.activePatient.progressForms[index].techID) {
                oldData.techID = $scope.constProgForm[index].techID;
                changedData.techID = $scope.activePatient.progressForms[index].techID;
                formChanged = true;
            }
            // Vet ID edited
            if($scope.constProgForm[index].vetID !== $scope.activePatient.progressForms[index].vetID) {
                oldData.vetID = $scope.constProgForm[index].vetID;
                changedData.vetID = $scope.activePatient.progressForms[index].vetID;
                formChanged = true;
            }
            // Add changed old fields input to progress form
            if(formChanged === true) {
                changedData.changedData = oldData;
                var progressFormUpdate = new ProgressFormsService(changedData);
                console.log('progress form edit:');
                console.log(progressFormUpdate);
                console.log(changedData);
                progressFormUpdate.$update(function(progressFormUpdateResponse) {
                    $scope.activePatient.progressForms[index].edit = false;   // Set done editing flag
                    //$scope.activePatient = ActivePatient.setPatientNeedsUpdate();
                });
            }
        };

        // Find out if food was adjusted
        // Need to display on the form whether it was yes or false.
        // Reason: Field is not stored in Database
        $scope.isFeedingAjusted = function(index) {
            var pat = ActivePatient.getActivePatient();
            if(pat.progressForms[index].overrideCupsPerFeeding === undefined &&
                pat.progressForms[index].vetIdOverrideCPF === undefined) {
                return true;
            }
            return false;
        };

        // Convert a lb weight to kg
        $scope.lbToKg = function(lbWeight) {
            return (lbWeight / 2.2046).toFixed(2);
        };
        // Convert a kg weight to lb
        $scope.kgToLb = function(kgWeight) {
            return (kgWeight * 2.2046).toFixed(2);
        };

        // Purpose: This function takes the index of a progress form 
        //          and return the weight of the progress form at index - 1
        $scope.getLastWeight = function(index) {
            var pat = ActivePatient.getActivePatient();
            if(pat.progressForms === undefined) {
                return pat.startWeight;
            }
            // Past Forms exist
            if(pat.progressForms.length !== 0) {
                if(index === -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight;
                }
                else if(index === 0) {
                    return pat.startWeight;
                }
                else {
                    return pat.progressForms[index-1].weight;
                }
            }
            // Past Forms DO NOT exist
            else if(index === -1) {
                return pat.startWeight;
            }
            return 0;
        };

        // Purpose:     Compute the weight loss for that day
        // Parameters:  Weight, index of current progress form
        $scope.getTodayWeightLoss = function(todayWeight, index) {
            var pat = ActivePatient.getActivePatient();
            // IF no progress EXIST yet
            if(pat.progressForms === undefined) {
                return pat.startWeight - todayWeight;
            }

            // IF progress form exist
            if(pat.progressForms.length === 0) {
                return pat.startWeight - todayWeight; 
            }
            else {
                if(index === -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight - todayWeight; 
                }
                else if (index === 0) {
                    return pat.startWeight - pat.progressForms[index].weight;
                }
                else {
                    return pat.progressForms[index-1].weight - pat.progressForms[index].weight;
                }
            }
            return 0;
        };


        // Purpose:     To parse a given string to Date format
        // Parameters:  strDate (Must be a string date in JSON format: YYYY-MM-DDT00:00:000Z)
        // Return:      Date object
        $scope.toDate = function(strDate) {
            var tmp = new Date();
            var year = parseInt(strDate.substring(0,4));
            var month = parseInt(strDate.substring(5,7)) - 1;
            var day = parseInt(strDate.substring(8,10));
            tmp.setFullYear(year);
            tmp.setMonth(month);
            tmp.setDate(day);
            return tmp;
        };

        // Purpose:     To compute the between 2 given dates
        // Parameters:  Date String, Date String  
        // Borrowed:    StackOverflow
        // Return:      Number of days (Int)
        $scope.getNumDays = function(firstDate, secondDate) {
            var oneDay = 24*60*60*1000;          // hours*minutes*seconds*milliseconds
            var strtDate = $scope.toDate(firstDate);
            var endDate = $scope.toDate(secondDate);
            return Math.round(Math.abs((strtDate.getTime() - endDate.getTime())/(oneDay)));
        };


        // Purpose:     Compute the average weight loss per week of a dog
        // Parameters:  Today's weight and the index of the progress form.
        // Description: This function is used by new form and past progress forms.
        //              An index of -1 means it is from New Progress form. Any other index
        //              means that call is from past progress forms
        // Average does not take into account the current date entered today
        $scope.getAvgWeightLossPerWeek = function(todayWeight, index) {
            var tmp;
            var res = 0;
            var strtDate;
            var endDate;
            var numWeeks;
            var pat = ActivePatient.getActivePatient();
            if(todayWeight === undefined) { return 0; }

            // Compute other total percent weight loss per visit
            // % Weight loss per visit = [(Previous weight - Current Weight) / Previous Weight] * 100
            // Average % Weight Loss = (% Weight Loss per visit) / (Days since last weight/7)

            // Case A: No progress form yet, call is coming from first progress form
            if( (pat.progressForms === undefined) || (pat.progressForms.length === 0) ){
                tmp = ( ((pat.startWeight - todayWeight) * 100) / pat.startWeight).toFixed(2);
                strtDate = pat.dateCreated;                                                     // Date of last weight
                endDate = $scope.dateCreated.toJSON();
                numWeeks = $scope.getNumDays(strtDate, endDate) / 7;

                // IF a week has not passed yet
                if(numWeeks < 1) {
                    res = 0;
                }
                else{
                    res = (tmp / numWeeks).toFixed(2);
                }
            }
            
            // Case B: Progress forms exist
            else {

                // Case 1: Calling from new progress form
                if(index === -1) {
                    strtDate = pat.progressForms[pat.progressForms.length - 1].dateCreated;             // Date of last weight
                    endDate = $scope.dateCreated.toJSON();
                    numWeeks = $scope.getNumDays(strtDate, endDate) / 7;                                // Number of weeks from last progress forms
                    // In the first week, there should not be any average loss yet. According to the given formula
                    if(numWeeks < 1) {                                             
                        res = 0;
                    }
                    else {
                        tmp = ( ((pat.progressForms[pat.progressForms.length-1].weight - todayWeight) * 100) / pat.progressForms[pat.progressForms.length-1].weight);
                        res = (tmp / numWeeks).toFixed(2);
                    }                                                    
                }
                // Case 2: Calling from past progress form
                else {
                    if(index === 0){
                        tmp = ( ((pat.startWeight - pat.progressForms[0].weight) * 100) / pat.startWeight);
                        strtDate = pat.dateCreated;                                                     // Date of last weight
                        endDate = pat.progressForms[index].dateCreated;                                 // Date of current weight
                        numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                    }
                    else {
                        tmp = ( ((pat.progressForms[index-1].weight - pat.progressForms[index].weight) * 100) / pat.progressForms[index-1].weight);
                        strtDate = pat.progressForms[index-1].dateCreated;                              // Date of last weight
                        endDate = pat.progressForms[index].dateCreated;                                 // Date of current weight
                        numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                    }

                    // IF a week has not passed yet
                    if(numWeeks < 1) {
                        res = 0;
                    }
                    else{
                        res = (tmp / numWeeks).toFixed(2);
                    }
                }
            }
            return res;
        };

        // Return the trimauxil dose base on today's weight
        $scope.getTrimauxilDose = function(weight) {
            var trimauxilDose = '';
            if(weight > 4 && weight <= 10) {trimauxilDose = 'S1'; }
            else if(weight > 10 && weight <= 21) {trimauxilDose = 'S2'; }
            else if(weight > 21 && weight <= 33) {trimauxilDose = 'M1'; }
            else if(weight > 33 && weight <= 55) {trimauxilDose = 'M2'; }
            else if(weight > 55 && weight <= 95) {trimauxilDose = 'L1'; }
            else if(weight > 95 && weight <= 140) {trimauxilDose = 'L2'; }
            else if(weight > 140 && weight <= 233) {trimauxilDose = 'L3'; }
            return trimauxilDose;
        };

        // When user clicks edit button
        $scope.getIdealWeight = function () {
            var currWeight = $scope.activePatient.startWeight;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            return (idealWeight * 2.20462).toFixed(2);
        };

        // Editing form's input
        $scope.editForm = function(index) {
            // If forms are locked from editing. Do not allow this to execute
            if($scope.formsLocked) {
                this.activePatient.progressForms[index].edit = false;
            }
            else {
                this.activePatient.progressForms[index].edit = true;
            }
        };

        // Cancel editing on forms
        $scope.cancelEditing = function(index) {
            // Reset form fields to original value due to user canceling changes
            this.activePatient.progressForms[index].edit = false;
            this.activePatient.progressForms[index].weightKg = $scope.constProgForm[index].weight.weightKg;
            this.activePatient.progressForms[index].weightLb = $scope.constProgForm[index].weight.weightLb;
            this.activePatient.progressForms[index].trimauxilUse = $scope.constProgForm[index].trimauxilUse;
            this.activePatient.progressForms[index].overrideCupsPerFeeding = $scope.constProgForm[index].overrideCupsPerFeeding;
            this.activePatient.progressForms[index].vetIdOverrideCPF = $scope.constProgForm[index].vetIdOverrideCPF;
            this.activePatient.progressForms[index].foodChanged = $scope.constProgForm[index].foodChanged;
            this.activePatient.progressForms[index].comments = $scope.constProgForm[index].comments;
            this.activePatient.progressForms[index].techID = $scope.constProgForm[index].techID;
            this.activePatient.progressForms[index].vetID = $scope.constProgForm[index].vetID;
            this.activePatient.progressForms[index].dateCreated = $scope.constProgForm[index].dateCreated;
        };


        // Purpose:     This function retrieve all the information regarding a particular food
        //              based on the food name. The retrieved information filled out on the form
        //              kcal/cup and kcal/kg if applicable
        // Parameters:  String representation of food name
        // Return:      kcal/cup
        $scope.getFoodInfo = function(foodName) {
            var i = $scope.dogFoodNames.indexOf(foodName);
            // Set scope variable if element is found
            if(i !== -1) {
                return $scope.dogFoods[i].kcalPerCup;
            }
            return undefined;  // Food is not in database
        };

        // Purpose:     This function serves as a workaround the issue of bootstrap typeahead
        //              directive not modeling the bootstrap directive
        $scope.formatLabel = function(model, pFormId) {
            console.log('Format Label, model: ' + model);
            var ans = '';
            if(model === '') {
                ans = '';
            }
            // If a number is passed, then user select a previously defined function
            else if(!isNaN(model)) {
                        ans = $scope.dogFoods[model].name;
            }
            else {
                ans = model;
            }

            // For call from past edited form and new form
            console.log('ans: ' + ans);
            if(pFormId === -1) {
                $scope.foodBrand = ans;
                $scope.foodkCal = $scope.getFoodInfo(ans);
            }
            else {
                $scope.activePatient.progressForms[pFormId].foodName = ans;
                console.log('$scope.getFoodInfo(ans): ' + $scope.getFoodInfo(ans));
                $scope.activePatient.progressForms[pFormId].foodkCal = $scope.getFoodInfo(ans);
            }
            return ans;
        };
        

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            console.log('APt: ' + $scope.activePatient);

            $scope.activePatient = ActivePatient.getActivePatient();
            //console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
            if(!ActivePatient.activePatientSet()) {
                $location.path('/'); 
                //setTimeout(function(){ $location.path('/overview'); }, 100);
            }
            $scope.formsLocked = $scope.formsLockedFromEditing();       // Are forms allowed to be edited?


            // Set Default next visit and next call date
            $scope.nextVisit = new Date();
            $scope.nextCall = new Date();
            var tmp = 7;
            $scope.nextCall.setDate($scope.nextCall.getDate() + tmp);   // Call 7 days from today
            tmp = 14;
            $scope.nextVisit.setDate($scope.nextVisit.getDate() + tmp); // Call 14 days from today      


            // Flag to prevent the user from adding a form if one is already entered
            $scope.todayFormSubmitFlag = false;
            if($scope.activePatient.progressForms === undefined || $scope.activePatient.progressForms.length === 0) {
                $scope.todayFormSubmitFlag = false;
            }
            else{
                var today = new Date();
                var lstForm = $scope.toDate($scope.activePatient.progressForms[$scope.activePatient.progressForms.length-1].dateCreated);
                if(today.getFullYear() === lstForm.getFullYear()) {
                    if(today.getMonth() === lstForm.getMonth()) {
                        if(today.getDate() === lstForm.getDate()) {
                            $scope.todayFormSubmitFlag = true;
                        }
                    }
                }
            }

            // Retrieve the list of foods that are in the database for food name field
            var foods = DogFoodService.query(function( getDogFoodsResponse ) {
                //console.log(getDogFoodsResponse);
                $scope.dogFoods = getDogFoodsResponse;
                for(var i = 0; i < $scope.dogFoods.length; i++) {
                    $scope.dogFoods[i].index = i;
                    $scope.dogFoodNames[i] = $scope.dogFoods[i].name;
                }

            });

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i !== $scope.activePatient.progressForms.length; ++i) {
                // Add necessary index and necessary flag to each progress form object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].edit = false;
                if($scope.activePatient.progressForms[i].overrideCupsPerFeeding === undefined &&
                    $scope.activePatient.progressForms[i].vetIdOverrideCPF === undefined) {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = false;
                    $scope.activePatient.progressForms[i].feedAdjustment = false;
                }
                else {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = true;
                    $scope.activePatient.progressForms[i].feedAdjustment = false;
                }
                $scope.activePatient.progressForms[i].foodChangedFlag = false;

                // For weight editing features in Adding new form
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);


                // Copy all the progress forms before user makes any modifications to them
                $scope.constProgForm[i] = new Object({
                    index:i,
                    edit: false,
                    weight:{
                        weightKg:$scope.activePatient.progressForms[i].weight,
                        weightLb:$scope.kgToLb($scope.activePatient.progressForms[i].weight)
                    },
                    trimauxilUse:$scope.activePatient.progressForms[i].trimauxilUse,
                    feedAdjustmentFlag: $scope.activePatient.progressForms[i].feedAdjustmentFlag,
                    overrideCupsPerFeeding: $scope.activePatient.progressForms[i].overrideCupsPerFeeding,
                    vetIdOverrideCPF: $scope.activePatient.progressForms[i].vetIdOverrideCPF,
                    foodChanged:$scope.activePatient.progressForms[i].foodChanged,
                    kcalPerCup: 0,
                    kcalPerKg: 0,
                    comments: $scope.activePatient.progressForms[i].comments,
                    techID: $scope.activePatient.progressForms[i].techID,
                    vetID: $scope.activePatient.progressForms[i].vetID,
                    dateCreated: $scope.activePatient.progressForms[i].dateCreated
                });

                console.log($scope.activePatient.progressForms[i].weight);
            }
        };

        $scope.initPatient();
    }
]);

angular.module('forms').filter('phoneFormat', ["$filter", function($filter) {
    // Assumes number in the format of XXX-XXX-XXXX
    return function (phoneNumber) {
        if (phoneNumber === null || phoneNumber === undefined) {
            return '';
        }

        else {
            var last4 = phoneNumber.substring(6, phoneNumber.length);
            var mid3 = phoneNumber.substring(3, 6);
            var first3 = phoneNumber.substring(0, 3);
            return (first3 + '-' + mid3 + '-' + last4);
        }
    };

}]);
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
'use strict';
/*'use strict';

// Setting up route
angular.module('patients').config(['$stateProvider',
  function ($stateProvider) {
    /*
    // Articles state routing
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      });
	
  }
]);*/
'use strict';

angular.module('patients', ['chart.js']).controller('patientsController', ['$scope', 'Authentication', '$location', '$stateParams', 'PatientsService', 'ActivePatient', /*'$localStorage',*/
    function($scope, Authentication, $location, $stateParams, PatientsService, ActivePatient) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // If the user is not logged in, redirect
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            if(!ActivePatient.activePatientSet()) {
                $location.path('/');
            }
        };

        // Get the correct patient into activePatient
        $scope.initPatient();
        $scope.activePatient = ActivePatient.getActivePatient();

        // 1 kg = 2.2046 lb
        var kgToLb = 2.2046;

        // Given a weight in kg return the weight in lbs
        $scope.kgToLb = function(kgWeight) {
          return (kgWeight * 2.2046).toFixed(2);
        };

        // The dog's current weight (either the start weight or the latest weight if there are progress forms available)
        $scope.weight = $scope.activePatient.startWeight * kgToLb;
        if($scope.activePatient.progressForms.length) {
          $scope.weight = $scope.activePatient.progressForms[$scope.activePatient.progressForms.length - 1].weight * kgToLb;
        }

        // Returns the correct Trimauxil dosage bag based on the dog's weight
        $scope.trimauxilSKU = function() {
          if($scope.weight >= 5 && $scope.weight <= 10) {
            return 'S1';
          }
          else if($scope.weight >= 11 && $scope.weight <= 21) {
            return 'S2';
          }
          else if($scope.weight >= 22 && $scope.weight <= 33) {
            return 'M1';
          }
          else if($scope.weight >= 34 && $scope.weight <= 55) {
            return 'M2';
          }
          else if($scope.weight >= 56 && $scope.weight <= 95) {
            return 'L1';
          }
          else if($scope.weight >= 96 && $scope.weight <= 140) {
            return 'L2';
          }
          else if($scope.weight >= 141 && $scope.weight <= 233) {
            return 'L3';
          }
        };

        // Displays the correct image URL based on the dog's weight (uses $scope.trimauxilSKU() from above to return the correct dosage bag)
        $scope.imageURL = 'modules/patients/img/' + $scope.trimauxilSKU() + '.png';

        // Returns a dog's ideal weight based on their start weight and start BCS
        $scope.idealWeight = function () {

            // Weight is in kg
            var currWeight = $scope.activePatient.startWeight;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8; // Formula given by Trimauxil

            // Return the weight in lbs
            return (idealWeight*kgToLb).toFixed(2);
        };

        // Line Graph Variables
        // An array with all of the dog's progress forms
        var progressForms = $scope.activePatient.progressForms;

        // The month the dog started treatment - pulled from the enrollment form
        var monthStarted = Number($scope.activePatient.dateCreated.substring(5,7));
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // The months shown on the line graph
        var monthsShown = [];

        // The dog's recorded weights (start weight and weights pulled from progress forms) that will be shown on the line graph
        var weightsShown = [];

        // The two trendlines that will be shown on the line graph. Based on percentLoss1 and percentLoss2.
        var trendOne = [];
        var trendTwo = [];
        var lastMonthShown = 0;
        var percentLoss1 = 0.99;
        var percentLoss2 = 0.98;

        // Add the initial month to monthsShown, and the initial weight to weightsShown, trendOne, and trendTwo
        monthsShown.push(months[monthStarted-1]); // Subtract 1 as the months go from 0-11 rather than 1-12 in the months array.
        weightsShown.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));
        trendOne.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));
        trendTwo.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));

        // Go through all the progress forms and add the month to monthsShown and the weights to weightsShown, trendOne, and trendTwo
        for(var i = 0; i < progressForms.length; i++) {
            monthsShown.push(months[(Number(progressForms[i].dateCreated.substring(5,7))-1)%12]);
            weightsShown.push((progressForms[i].weight * kgToLb).toFixed(2));
            trendOne.push((progressForms[i].weight * kgToLb).toFixed(2));
            trendTwo.push((progressForms[i].weight * kgToLb).toFixed(2));

            // Add the last month shown on the progress forms
            if(i === progressForms.length - 1) {
                lastMonthShown = Number(progressForms[i].dateCreated.substring(5,7));
          }
        }

        var i = 0;
        // Keep adding weights to the trendlines based on the percent loss until the goal weight is reached
        while(trendOne[trendOne.length - 1] * percentLoss1 > $scope.idealWeight()) {
            monthsShown.push(months[(lastMonthShown+i)%12]);
            trendOne.push((trendOne[trendOne.length-1] * percentLoss1).toFixed(2));
            trendTwo.push((trendTwo[trendTwo.length-1] * percentLoss2).toFixed(2));
            i++;
        }

        // Define the variables needed for the line graph
        $scope.labelsLine = monthsShown;
        $scope.colorsLine = ['#6399CC', '#505050','#757575'];
        // 5% loss and 10% loss headings have to be changed if percentLoss1 and/or percentLoss2 are changed
        $scope.seriesLine = ['Current Weight', '1% Loss','2% Loss'];
        $scope.dataLine = [
            weightsShown,
            trendOne,
            trendTwo
        ];

        $scope.poundsToGo = ($scope.weight-$scope.idealWeight()).toFixed(2);
        $scope.totalWeightLost = (($scope.activePatient.startWeight * kgToLb) - $scope.weight).toFixed(2);
        // If the dog has lost more weight than needed, poundsToGo = 0
        if($scope.poundsToGo < 0) {
          $scope.poundsToGo = 0;
        }
        // If the dog has gained weight, totalWeightLost = 0
        if($scope.totalWeightLost < 0) {
            $scope.totalWeightLost = 0;
        }
        // Weight Lost vs. Pounds To Go Doughnut Graph
        $scope.labelsDoughnut = ['Total Weight Lost', 'Pounds To Go'];
        $scope.dataDoughnut = [$scope.totalWeightLost, $scope.poundsToGo];
        $scope.colorsDoughnut = ['#6399CC', '#505050'];
    }
]);

'use strict';

angular.module('patients').service('ActivePatient', ['PatientsService', 'PracticesService',
    function(PatientsService, PracticesService) {

        
        var activePatient = {};
        var patientNeedsUpdate = false;

        var activePractice = {};
        var practiceNeedsUpdate = false;

        return {
            setActivePatient: function(patientToSet) {
                // Takes in an object and makes that the active patient 
                //  ~ no checking to make sure it is a valid patient
                activePatient = patientToSet;
                return activePatient;
            },

            getActivePatient: function() {
                // Returns the active patient unless an update has been requested at which point it will get the latest version of the current active patient from the database
                if(patientNeedsUpdate) {
                    patientNeedsUpdate = false;
                    var patient = new PatientsService({
                        _id: activePatient._id,
                        populateForms: true
                    });
                    
                    patient.$get(function( updateActivePatientResponse ) {
                        activePatient = updateActivePatientResponse;
                        //console.log('APt: ' + JSON.stringify(activePatient, null, 4));
                        return activePatient;
                    });
                }
                else {
                    //console.log('APt: ' + JSON.stringify(activePatient, null, 4));
                    return activePatient;
                }
            },

            setPatientNeedsUpdate: function() {
                // Request an update the next time getActivePatient is called
                patientNeedsUpdate = true;
            },

            updateActivePatient: function() {
                // Similar to getActivePatient but will always get the latest version from the database
                var patient = new PatientsService({
                    _id: activePatient._id,
                    populateForms: true
                });
                
                patient.$get(function( updateActivePatientResponse ) {
                    activePatient = updateActivePatientResponse;
                    patientNeedsUpdate = false;
                    console.log('update done: ' + activePatient.firstName);
                    return activePatient;
                });
            },

            activePatientSet: function() {
                if(activePatient._id === undefined || activePatient._id === null) {
                    return false;
                }
                else {
                    return true;
                }
            },



            setActivePractice: function(practiceToSet) {
                activePractice = practiceToSet;
                return activePractice;
            },

            getActivePractice: function() {
                if(practiceNeedsUpdate) {
                    var practice = new PracticesService({
                        _id: activePractice._id
                    });
                    
                    practice.$get(function( updateActivePracticeResponse ) {
                        activePractice = updateActivePracticeResponse;
                        practiceNeedsUpdate = false;
                        return activePractice;
                    });
                }
                else {
                    return activePractice;
                }
            },

            setPracticeNeedsUpdate: function() {
                practiceNeedsUpdate = true;
            },

            updateActivePractice: function() {
                var practice = new PracticesService({
                    _id: activePractice._id
                });
                
                practice.$get(function( updateActivePracticeResponse ) {
                    activePractice = updateActivePracticeResponse;
                    practiceNeedsUpdate = false;
                    return activePractice;
                });
            }
            
        };

    }
]);

'use strict';

// Patient service used for communicating with the forms REST endpoints
angular.module('patients').factory('PatientsService', ['$resource',
    function ($resource) {
        return $resource('/api/patients/:patientId', {
            patientId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

'use strict';

angular.module('petOwners').controller('petOwnersController', ['$scope', 'Authentication', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, $location, $stateParams,  ActivePatient) {
    	$scope.authentication = Authentication;
        if (!$scope.authentication.user) {
        	$location.path('/');
        }
    }
]);

'use strict';


angular.module('petOwners').factory('PetOwnersService', ['$resource',
    function ($resource) {
        return $resource('/api/petOwners/:petOwnerId', {
            petOwnerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
'use strict';

'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', 'PatientsService', 'FeedbackService', '$location', '$stateParams', '$window', 'ActivePatient',
    function($scope, Authentication, PracticesService, PatientsService, FeedbackService, $location, $stateParams, $window, ActivePatient) {

        $scope.patients = ActivePatient.getActivePractice().patients;
        $scope.practiceName = ActivePatient.getActivePractice().name;

        $scope.authentication = Authentication;
        console.log(JSON.stringify($scope.authentication, null, 4));

        // if a user is not logged in, route us back to the root
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatientsList = [];
        $scope.activePatientsFiltered = [];

        $scope.inactivePatientsList = [];
        $scope.inactivePatientsFiltered = [];

        $scope.keysToSearch = ['patientId', 'firstName', 'dateCreated'];
        $scope.petOwnerKeysToSearch = ['lastName', 'firstName', 'phoneNumber'];
        $scope.sortBy = '';

        $scope.search = '';

        $scope.changeSort = function(sortRequest) {
            if($scope.sortBy === sortRequest) {
                $scope.sortBy = '-' + sortRequest;
            }
            else if($scope.sortBy === ('-' + sortRequest)) {
                $scope.sortBy = '';
            }
            else {
                $scope.sortBy = sortRequest;
            }

            // Angular needs to update the view so the latest size is measured. This is not ideal.
            setTimeout(function(){ $('.headerTableContainer').height($('.patientListTableHead').height()); }, 20);
        };


        $scope.newPatientClick = function() {
            // Clear active patient
            ActivePatient.setActivePatient({});

            // Go to enrollment form
            $location.path('/enrollmentForm');

        };

        $scope.selectPatient = function(selectedPatient) {
            ActivePatient.setActivePatient(selectedPatient);

            // Get active patient to populate forms
            var patient = new PatientsService({
                _id: selectedPatient._id,
                populateForms: true
            });

            patient.$get(function(selectActivePatientResponse) {
                ActivePatient.setActivePatient(selectActivePatientResponse);

                // Redirect to overview
                $location.path('/overview');
            });
        };

        $scope.initPractice = function() {

            var practice;
            if($scope.authentication.user.practiceDocId !== undefined) {
                practice = new PracticesService({
                    _id: $scope.authentication.user.practiceDocId
                });
            }
            // Else should be replaced with redirect to signin for real use
            else {
                practice = new PracticesService({
                    _id: '5639a8f129e356c349ff1934'
                });
            }
            

            $scope.getPracticePromise = practice.$get(function(practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;
                $scope.practiceName = ActivePatient.getActivePractice().name;

                console.log('APc: ' + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                ActivePatient.setPatientNeedsUpdate();
                console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

                for (var i = 0; i < practiceResponse.patients.length; i++) {
                    if (practiceResponse.patients[i].exitForm === undefined) {
                        $scope.activePatientsList.push(practiceResponse.patients[i]);
                    }
                    else {
                        $scope.inactivePatientsList.push(practiceResponse.patients[i]);
                    }
                }

                $scope.activePatientsFiltered = $scope.activePatientsList;
                $scope.inactivePatientsFiltered = $scope.inactivePatientsList;

                // Initialize scroll bar
                $('.tableContainer').mCustomScrollbar({
                    scrollbarPosition: 'outside',
                    callbacks: {
                        /*
                        whileScrolling: function() {
                            if (this.mcs.topPct === 100) {
                                $('.tableContainer').removeClass('tableContainerBottomBorder');
                            } else {
                                $('.tableContainer').addClass('tableContainerBottomBorder');
                            }
                        }*/
                    }

                });

                $('.headerTableContainer').height($('.patientListTableHead').height());

                return;
            });

            /*
            // Create new practice
            var practice = new PracticesService({
                _id: '5639a8f129e356c349ff1934',
                name: 'Acme Animal Care',
                address: '123 Street Rd, Nowhere, FL 33333',
                practiceId: 'fakePracticeId'
            });

            practice.$save(function (practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                ActivePatient.setPracticeNeedsUpdate();
                console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));
                
            });
            */
        };

        $scope.searchChange = function(page) {
            if(page === 'active') {
                $scope.activePatientsFiltered = $scope.activePatientsList;
                $scope.activePatientsFiltered = $scope.activePatientsFiltered.filter(searchFilter);
            }
            else if(page === 'inactive') {
                $scope.inactivePatientsFiltered = $scope.inactivePatientsList;
                $scope.inactivePatientsFiltered = $scope.inactivePatientsFiltered.filter(searchFilter);   
            }
            $('.headerTableContainer').height($('.patientListTableHead').height());
        };

        function searchFilter(item) {
            // Counld add multi word search, eg 'firstName lastName', split at space, change true returns to increment a count, if count == number of words, return true.

            var i;
            for (i = 0; i < $scope.keysToSearch.length; i++) {
                if (item.hasOwnProperty($scope.keysToSearch[i])) {
                    if (item[$scope.keysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        return true;
                    }
                }
            }

            // Search pet owner fields
            if(item.hasOwnProperty('petOwner') && item.petOwner !== null && item.petOwner !== undefined) {
                var itemPetOwner = item.petOwner;
                for(i = 0; i < $scope.petOwnerKeysToSearch.length; i++) {
                    if (itemPetOwner.hasOwnProperty($scope.petOwnerKeysToSearch[i])) {
                        if (itemPetOwner[$scope.petOwnerKeysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            }


            return false;
        }

        // Maintian table header size on window resize, binding to window extends outside of this controller
        var window = angular.element($window);
        window.bind('resize', function () {
            $('.headerTableContainer').height($('.patientListTableHead').height());
        });

    }
]);

angular.module('practices').filter('dateFormat', ["$filter", function($filter) {

    return function(input) {
        if (input === null) {
            return '';
        }

        return $filter('date')(new Date(input), 'dd MMM yyyy');
    };

}]);

angular.module('practices').filter('phoneFormat', ["$filter", function($filter) {
    // Assumes number in the format of XXX-XXX-XXXX
    return function (phoneNumber) {
        if (phoneNumber === null || phoneNumber === undefined) {
            return '';
        }

        else {
            var last4 = phoneNumber.substring(6, phoneNumber.length);
            var mid3 = phoneNumber.substring(3, 6);
            var first3 = phoneNumber.substring(0, 3);
            return (first3 + '-' + mid3 + '-' + last4);
        }
    };

}]);

'use strict';


angular.module('practices').factory('PracticesService', ['$resource',
    function ($resource) {
        return $resource('/api/practices/:practiceId', {
            practiceId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
]);

'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/views/admin/user-list.client.view.html',
        controller: 'UserListController'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/views/admin/user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/views/admin/user-edit.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

/*'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/views/password/reset-password.client.view.html'
      });
  }
]);*/

'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);

'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function () {
      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication',
    function($scope, $state, $http, $location, $window, Authentication) {
        $scope.authentication = Authentication;

        // Get an eventual error defined in the URL query string:
        $scope.error = $location.search().err;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $location.path('/');
        }

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

        $scope.signin = function() {
            $http.post('/api/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the previous or home page
                $state.go('home');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        // OAuth provider request
        $scope.callOauthProvider = function(url) {
            var redirect_to;

            if ($state.previous) {
                redirect_to = $state.previous.href;
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url + (redirect_to ? '?redirect_to=' + encodeURIComponent(redirect_to) : '');
        };
    }
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);

'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);

        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
  }
]);

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
  }
]);

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

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
