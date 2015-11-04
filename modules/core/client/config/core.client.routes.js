'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      /*.state('home', {
        url: '/',
        views: {
            "sidebar": {
                templateUrl: "/modules/core/views/sidebar.client.view.html"
            },
            "content": {
                templateUrl: "modules/patients/views/overview.client.view.html"
            }
        }
      })*/
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      })
	  .state('overview', {
            url: "/overview",
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
            url: "/progressForms",
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
            url: "/",
            views: {
                "content": {
                    templateUrl: "modules/practices/views/vetHomepage.client.view.html"
                }
            }
      })
	  .state('login', {
            url: "/login",
            views: {
                "sidebar": {
                    templateUrl: "/modules/core/views/sidebar.client.view.html"
                },
                "content": {
                    templateUrl: "modules/forms/views/login.client.view.html"
                }
            }
      });
  }
]);
