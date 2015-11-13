'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');
    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        views: {
            "content":{
              template: '<div ui-view></div>',
              controller: function($state, Authentication){
                  if(Authentication.user){
                    $state.go('vetHomepage');
                    }
                    else{
                      $state.go('signin');
                    }
                }
            }

        } 
      }) // end comment here
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      })
	  .state('overview', {
            url: '/overview',
            views: {
                "sidebar": {
                    templateUrl: "/modules/core/views/sidebar.client.view.html"
                },
                "content": {
                    templateUrl: "modules/patients/views/overview.client.view.html"
                }
            }
      })
	  .state('progressForms', {
            url: '/progressForms',
            views: {
                "sidebar": {
                    templateUrl: "/modules/core/views/sidebar.client.view.html"
                },
                "content": {
                    templateUrl: "modules/forms/views/progressForms.client.view.html"
                }
            }
      })
	  .state('enrollmentForm', {
            url: "/enrollmentForm",
            views: {
                "sidebar": {
                    templateUrl: "/modules/core/views/sidebar.client.view.html"
                },
                "content": {
                    templateUrl: "modules/forms/views/enrollmentForm.client.view.html"
                }
            }
      })
      .state('vetFeedback', {
              url: "/vetFeedback",
              views: {
                  "sidebar": {
                      templateUrl: "/modules/core/views/sidebar.client.view.html"
                  },
                  "content": {
                      templateUrl: "modules/forms/views/feedbackForm.client.view.html"
                  }
              }
        })
	  .state('exitForm', {
            url: "/exitForm",
            views: {
                "sidebar": {
                    templateUrl: "/modules/core/views/sidebar.client.view.html"
                },
                "content": {
                    templateUrl: "modules/forms/views/exitForm.client.view.html"
                }
            }
      })
	  .state('vetHomepage', {
            url: "/vetHome",
            views: {
                "content": {
                    templateUrl: "modules/practices/views/vetHomepage.client.view.html"
                }
            }
      })
      //begin adding new states from users routes folder
      .state('settings', {
          abstract: true,
          url: '/settings',
          templateUrl: 'modules/users/views/settings/settings.client.view.html',
           views: {
            "content": {
                templateUrl: "modules/users/views/settings/settings.client.view.html"
            }
          },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/settings/edit-profile.client.view.html"
            }
          }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/settings/change-password.client.view.html"
            }
          }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html',
      views: {
            "content": {
                templateUrl: "modules/users/views/settings/manage-social-accounts.client.view.html"
            }
          }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/settings/change-profile-picture.client.view.html"
            }
          }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'modules/users/views/authentication/signup.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/authentication/signup.client.view.html"
            }
          }
      })
      .state('signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/views/authentication/signin.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/authentication/signin.client.view.html"
            }
          }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        views: {
            "content": {
                templateUrl: "modules/users/views/password/forgot-password.client.view.html"
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
        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/password/reset-password-invalid.client.view.html"
            }
          }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html',
         views: {
            "content": {
                templateUrl: "modules/users/views/password/reset-password-success.client.view.html"
            }
          }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/views/password/reset-password.client.view.html',
        views: {
            "content": {
                templateUrl: "modules/users/views/password/reset-password.client.view.html"
            }
          }
      })


  }
]);
