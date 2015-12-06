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
'use strict';


angular.module('auxthera').factory('FeedbackService', ['$resource',
    function ($resource) {
        return $resource('/api/auxthera/feedback/:feedbackId', {
            feedbackId: '@_id'
        }, {
            update: {
                method: 'PUT'
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
                        templateUrl: 'modules/users/views/authentication/signup.client.view.html'
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

angular.module('forms').controller('enrollmentFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'EnrollmentFormsService', 'PatientsService', 'PracticesService', 'ActivePatient',
    function($scope, Authentication, $location, $stateParams, EnrollmentFormsService, PatientsService, PracticesService, ActivePatient) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        console.log($scope.authentication);
        if (!$scope.authentication.user) {
            $location.path('/');
            console.log($scope.authentication);
        }

        $scope.activePatient = ActivePatient.getActivePatient();

        $scope.practiceInfo = {
            preferredUnit: 'kg'
        };

        $scope.firstName = $scope.activePatient.firstName;
        $scope.patientId = $scope.activePatient.patientId;
        $scope.birthDate = $scope.activePatient.birthDate;
        $scope.startWeight = $scope.activePatient.startWeight;
        $scope.sex = $scope.activePatient.sex;
        $scope.fixed = $scope.activePatient.fixed;
        $scope.breed = $scope.activePatient.breed;
        $scope.bcs = $scope.activePatient.bcs;

        if($scope.firstName) {
            $scope.disableInput = true;
        }
        else {
            $scope.disableInput = false;
        }

        console.log('birthDate: ' + $scope.birthDate);

        $scope.editForm = function() {
            $scope.disableInput = false;
        };
        $scope.cancelEdit = function() {
            $scope.disableInput = true;
        };

        var today = new Date();
        var month = today.getMonth(); //months from 1-12
        var day = today.getDate();
        var year = today.getFullYear();
        today = new Date(year, month, day);
        $scope.todayDate = today;

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
        };

        $scope.createEnrollmentForm = function() {

            var patient = new PatientsService({
                dateCreated: $scope.todayDate,
                firstName: this.firstName,
                patientId: this.patientId,
                birthDate: this.birthDate,
                sex: this.sex,
                fixed: this.fixed,
                breed: this.breed,
                startWeight: this.startWeight,
                bcs: this.bcs,
                practice: ActivePatient.getActivePractice()._id
            });

            var enrollmentForm = new EnrollmentFormsService({
                treats: this.treats,
                currentMedications: this.currentMedications,
                medicalHistory: this.medicalHistory,
                peFindings: this.peFindings,
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

                enrollmentForm.$save(function(enrollmentFormResponse) {
                    // executed after save
                    //patientResponse.enrollmentForm = enrollmentFormResponse._id;
                    //patientResponse.formSave = true;
                    patient = new PatientsService({
                        _id: patientResponse._id,
                        enrollmentForm: enrollmentFormResponse._id,
                        formSave: true
                    });

                    patient.$update(function(patientAddFormResponse) {
                        ActivePatient.setPatientNeedsUpdate();
                        $location.path('/overview');
                    });
                });
            });
        };

    // Do they want some prepopulated values?
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
            return null;
        }
    };

    $scope.patientInfo.idealWeight = function () {
        var currWeight;
        var bodyFat;
        var idealWeight;
        
        if($scope.disableInput) {
            currWeight = $scope.activePatient.startWeight;
            bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            if($scope.practiceInfo.preferredUnit === 'kg') {
              return idealWeight.toFixed(2);
            }
            else {
              return (idealWeight * 2.20462).toFixed(2);
            }
        }
        else {
            currWeight = $scope.startWeight;
            bodyFat = $scope.bcs * 5; // Assumes each BCS equals 5% body fat
            idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            if($scope.practiceInfo.preferredUnit === 'kg') {
                return idealWeight.toFixed(2);
            }
            else {
                return (idealWeight * 2.20462).toFixed(2);
            }
        }
    };

    $scope.patientInfo.cupsPerFeeding = function () {
        var dailykCalIdealWeight = 600; // Use Recommended Daily Caloric Intake for Ideal Weight Chart
        var kCalPerCup = 150; // Eventually need to find on food database
        var cupsPerDay = dailykCalIdealWeight/kCalPerCup;
        var perDay = $scope.patientInfo.perDay;
        var cupsPerFeeding = cupsPerDay/perDay;

        return cupsPerFeeding.toFixed(2);
    };

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
  }
]);

'use strict';

angular.module('forms').controller('exitFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'ExitFormsService', 'PatientsService','ActivePatient',
  function ($scope, Authentication, $location, $stateParams, ExitFormsService, PatientsService,ActivePatient) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

    $scope.practiceInfo = {
        preferredUnit: 'kg'
    };

    console.log($scope.authentication);
    if (!$scope.authentication.user) {
        $location.path('/');
        console.log($scope.authentication);
    }

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

    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.endingDate = today;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
      startBCS: $scope.activePatient.bcs
    };

    $scope.patientInfo.startWeight = function() {
      if($scope.practiceInfo.preferredUnit === 'kg') {
        return $scope.activePatient.startWeight;
      }
      else {
        return ($scope.activePatient.startWeight * 2.20462).toFixed(2);
      }
    };

    $scope.patientInfo.weightLossTotal = function () {
        var startWeight = $scope.activePatient.startWeight;
        var finalWeight = $scope.finalWeight;

        if($scope.practiceInfo.preferredUnit === 'kg') {
          return (startWeight - finalWeight).toFixed(2);
        }
        else {
          return ((startWeight * 2.20462 - finalWeight)).toFixed(2);
        }
    };
  }
]);

'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true;                                    // To allow one form to open at a time
        $scope.enterFood = false;                                   // Use to give user the options to enter food info
        $scope.feedAdjustFlag = false;                              // Flag use to override feeding adjustment in new form 
        $scope.weight = {
            lb: '',
            kg: ''
        };
        $scope.constProgForm = [];                                  // Empty array to store progress form before it is changed

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            $scope.formsLocked = $scope.formsLockedFromEditing();    // Are forms allowed to be edited?

            // Flag to prevent the user from adding a form if one is already entered
            $scope.todayFormSubmitFlag = false;
            var today = new Date();
            var lstForm = $scope.toDate($scope.activePatient.progressForms[$scope.activePatient.progressForms.length-1].dateCreated);
            if(today.getFullYear() === lstForm.getFullYear()) {
                if(today.getMonth() === lstForm.getMonth()) {
                    if(today.getDate() === lstForm.getDate()) {
                        $scope.todayFormSubmitFlag = true;
                    }
                }
            }
            

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i !== $scope.activePatient.progressForms.length; ++i) {
                // Store progress form before user make any modifications
                $scope.constProgForm[i] = $scope.activePatient.progressForms[i];

                // Add index in object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].trimDose = $scope.getTrimauxilDose($scope.activePatient.progressForms[i].weight);
                $scope.activePatient.progressForms[i].edit = false;
                $scope.activePatient.progressForms[i].feedAdjustmentFlag = false;
                $scope.activePatient.progressForms[i].foodChangedFlag = false;

                // For weight editing features
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);

                // Copy other fields for when user edit forms
                $scope.activePatient.progressForms[i].oldTrimauxilUse = $scope.activePatient.progressForms[i].trimauxilUse;
                $scope.activePatient.progressForms[i].oldfoodChanged = $scope.activePatient.progressForms[i].foodChanged;
                $scope.activePatient.progressForms[i].oldComments = $scope.activePatient.progressForms[i].comments;
                $scope.activePatient.progressForms[i].oldoverrideCupsPerFeeding = $scope.activePatient.progressForms[i].overrideCupsPerFeeding;
                $scope.activePatient.progressForms[i].oldvetID = $scope.activePatient.progressForms[i].vetID;
                $scope.activePatient.progressForms[i].oldtechID = $scope.activePatient.progressForms[i].techID;

                console.log($scope.activePatient.progressForms[i].weight);
            }
        };

        // Create new progress form
        $scope.createProgressForm = function() {
            // Create new ProgressForm object

            console.log('create p form');

            var progressForm = new ProgressFormsService({
                weight: this.weight.kg,
                trimauxilUse: this.trimauxilUse,
                weightLossAppropriate: this.weightLossAppropriate,
                foodChanged: this.foodChanged,
                comments: this.comments,
                techID: this.techID,
                vetID: this.vetID,
                patient: ActivePatient.getActivePatient()._id
            });

            progressForm.$save(function(progressFormResponse) {
                // Function that is executed after save

                console.log('saved p form');

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
            var fieldChanged = {};
            var changeMadeFlag = false;                         // Flag to check if any field was changed

            var progressFormUpdate = new ProgressFormsService({
                _id: ActivePatient.getActivePatient().progressForms[index]._id
            });

            // Add fields changed to Progress Form service
            if(this.activePatient.progressForms[index].weightKg !== this.activePatient.progressForms[index].weight) {
                fieldChanged.weight = this.activePatient.progressForms[index].weight;
                progressFormUpdate.weight = this.activePatient.progressForms[index].weightKg;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].weight = this.activePatient.progressForms[index].weightKg;
            }
            if(this.activePatient.progressForms[index].oldTrimauxilUse !== this.activePatient.progressForms[index].trimauxilUse) {
                fieldChanged.trimauxilUse = this.activePatient.progressForms[index].oldTrimauxilUse;
                progressFormUpdate.trimauxilUse = this.activePatient.progressForms[index].trimauxilUse;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldTrimauxilUse = this.activePatient.progressForms[index].trimauxilUse;
            }
            if(this.activePatient.progressForms[index].oldfoodChanged !== this.activePatient.progressForms[index].foodChanged) {
                fieldChanged.foodChanged = this.activePatient.progressForms[index].foodChanged;
                // Need to also check if food change is true
                // So that the calory can be updated as well
            }
            if(this.activePatient.progressForms[index].oldComments !== this.activePatient.progressForms[index].comments) {
                fieldChanged.comments = this.activePatient.progressForms[index].oldComments;
                progressFormUpdate.comments = this.activePatient.progressForms[index].comments;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldComments = this.activePatient.progressForms[index].comments;
            }
            if(this.activePatient.progressForms[index].oldtechID !== this.activePatient.progressForms[index].techID) {
                fieldChanged.techID = this.activePatient.progressForms[index].oldtechID;
                progressFormUpdate.techID = this.activePatient.progressForms[index].techID;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldtechID = this.activePatient.progressForms.techID;
            }
            if(this.activePatient.progressForms[index].oldvetID !== this.activePatient.progressForms[index].vetID) {
                fieldChanged.vetID = this.activePatient.progressForms[index].oldvetID;
                progressFormUpdate.vetID = this.activePatient.progressForms[index].vetID;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].vetID = this.activePatient.progressForms[index].oldvetID;
            }
            // Add changed old fields input to progress form
            if(changeMadeFlag === true) {
                // Add changed data to list of changed data
                progressFormUpdate.changedData = fieldChanged;
            }

            // For testing purposes, remove before deployment
            console.log('***************');
            console.log(fieldChanged);

            // Call Update field in the database

            // Update this object fields so that changes reflect on the front end
            this.activePatient.progressForms[index].edit = false;           // Set done editing flag
        };

        // Convert a lb weight to kg
        $scope.lbToKg = function(lbWeight) {
            return (lbWeight / 2.2046).toFixed(2);
        };
        // Convert a kg weight to lb
        $scope.kgToLb = function(kgWeight) {
            return (kgWeight * 2.2046).toFixed(2);
        };
        // Get last week weight
        // This function takes the index of a progress form an return the last weight
        $scope.getLastWeight = function(index) {
            var pat = ActivePatient.getActivePatient();
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

        // Compute the weight loss for that day
        // Param: weight, index of current progress form
        $scope.getTodayWeightLoss = function(todayWeight, index) {
            var pat = ActivePatient.getActivePatient();
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

        // Function to parse a given string to Date format
        // Date must be in default format: YYYY-MM-DD ...
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

        // Check if forms should be locked. Return true or false
        $scope.formsLockedFromEditing = function() {
            var pat = ActivePatient.getActivePatient();
            if(pat.exitForm !== undefined) {
                var today = Date();
                var exitDate = $scope.toDate(pat.exitForm.dateCreated);
                if($scope.getNumDays(exitDate, today)) {
                    return true;
                }
            }
            return false;
        };

        // Function borrowed online to compute number of weeks between two dates
        $scope.getNumDays = function(firstDate, secondDate) {
            var oneDay = 24*60*60*1000;          // hours*minutes*seconds*milliseconds
            var strtDate = $scope.toDate(firstDate);
            var endDate = $scope.toDate(secondDate);
            return Math.round(Math.abs((strtDate.getTime() - endDate.getTime())/(oneDay)));
        };

        // Compute the average weight loss
        // Average does not take into account the current date entered today
        $scope.getAvgWeightLossPerWeek = function() {
            var res = 0;
            var pat = ActivePatient.getActivePatient();
            if (pat.progressForms.length === 0) {
                return 0;
            } else {
                var strtDate = pat.progressForms[0].dateCreated;
                var endDate = pat.progressForms[pat.progressForms.length - 1].dateCreated;
                var numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                var weightLoss = (pat.progressForms[0].weight - pat.progressForms[pat.progressForms.length - 1].weight);
                if (numWeeks === 0) { res = (weightLoss / pat.startWeight) / 1; }
                else { res = (weightLoss / pat.startWeight) / numWeeks; }
                return res.toFixed(2);
            }
        };

        $scope.getPercentWeightLoss = function() {
            console.log('Kinderley');
            console.log(this.index);
            console.log(this.weight.kg);
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

            // Reset form fields to original
            this.activePatient.progressForms[index].edit = false;
            this.activePatient.progressForms[index].weightKg = this.activePatient.progressForms[index].weight;
            this.activePatient.progressForms[index].weightLb = $scope.kgToLb(this.activePatient.progressForms[index].weight);
            this.activePatient.progressForms[index].trimauxilUse = this.activePatient.progressForms[index].oldTrimauxilUse;
            this.activePatient.progressForms[index].foodChanged = this.activePatient.progressForms[index].oldfoodChanged;
            this.activePatient.progressForms[index].comments = this.activePatient.progressForms[index].oldComments;
        };
    }
]);
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

angular.module('patients', ['chart.js']).controller('patientsController', ['$scope', 'Authentication', '$location', '$stateParams', 'PatientsService', 'ActivePatient',
    function($scope, Authentication, $location, $stateParams, PatientsService, ActivePatient) {

        $scope.authentication = Authentication;

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatient = ActivePatient.getActivePatient();

        var progressForms = $scope.activePatient.progressForms;
        var monthStarted = Number($scope.activePatient.dateCreated.substring(5,7));
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var idealWeights = [100,95,90,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,5];
        var monthsShown = [];
        var weightsShown = [];
        var idealWeightsShown = [];

        monthsShown.push(months[monthStarted-1]);
        weightsShown.push($scope.activePatient.startWeight);
        idealWeightsShown.push(idealWeights[0]);

        for(var i = 0; i < progressForms.length; i++) {
          monthsShown.push(months[Number(progressForms[i].dateCreated.substring(5,7))-1]);
          weightsShown.push(progressForms[i].weight);
          idealWeightsShown.push(idealWeights[i+1]);
        }

        $scope.labelsLine = monthsShown;
        $scope.colorsLine = ['#6399CC', '#505050'];
        $scope.seriesLine = ['Current Weight', 'Ideal Weight'];
        $scope.dataLine = [
            weightsShown,
            idealWeightsShown
        ];

        $scope.weight = $scope.activePatient.startWeight;
        if($scope.activePatient.progressForms.length) {
          $scope.weight = $scope.activePatient.progressForms[$scope.activePatient.progressForms.length - 1].weight;
        }

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

        $scope.imageURL = "modules/patients/img/" + $scope.trimauxilSKU() + ".png";

        $scope.idealWeight = function () {
            var currWeight = $scope.activePatient.startWeight;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            return (idealWeight).toFixed(2);
        };

        // Weight Lost vs. Pounds To Go Doughnut Graph
        $scope.labelsDoughnut = ['Total Weight Lost', 'Pounds To Go'];
        $scope.dataDoughnut = [($scope.activePatient.startWeight-$scope.weight).toFixed(2), ($scope.weight-$scope.idealWeight()).toFixed(2)];
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
                        return activePatient;
                    });
                }
                else {
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

        $scope.authentication = Authentication;

        // if a user is not logged in, route us back to the root
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatientsList = [];
        $scope.activePatientsFiltered = [];
        $scope.keysToSearch = ['patientId', 'firstName'];
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

            var practice = new PracticesService({
                _id: '5639a8f129e356c349ff1934'
            });

            $scope.getPracticePromise = practice.$get(function(practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                console.log('APc: ' + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                ActivePatient.setPatientNeedsUpdate();
                console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

                for (var i = 0; i < practiceResponse.patients.length; i++) {
                    if (practiceResponse.patients[i].exitForm === undefined) {
                        $scope.activePatientsList.push(practiceResponse.patients[i]);
                    }
                }

                $scope.activePatientsFiltered = $scope.activePatientsList;

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

        $scope.searchChange = function() {
            $scope.activePatientsFiltered = $scope.activePatientsList;
            $scope.activePatientsFiltered = $scope.activePatientsFiltered.filter(searchFilter);
            $('.headerTableContainer').height($('.patientListTableHead').height());
        };

        function searchFilter(item) {
            for (var i = 0; i < $scope.keysToSearch.length; i++) {
                if (item.hasOwnProperty($scope.keysToSearch[i])) {
                    if (item[$scope.keysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        return true;
                    }
                }
            }

            return false;
        }


        $scope.newFeedback = function() {

            var feedback = new FeedbackService({
                messages: [{ message: this.message }],
                patient: ActivePatient.getActivePatient()._id,
                practice: ActivePatient.getActivePractice()._id,
                company: '5650077a8038b1a6d2e24bac' // user: Admin
            });

            feedback.$save(function(feedbackResponse) {
                
            });
        };


        // Maintian table header size on window resize
        var window = angular.element($window);
        window.bind('resize', function () {
            console.log('resize');
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
