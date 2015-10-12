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
        templateUrl: 'modules/core/views/home.client.view.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      })
      .state('progressForms', {
        url: '/progressForms',
        templateUrl: 'modules/forms/views/progressForms.client.view.html'
      })
      .state('enrollmentForm', {
        url: '/enrollmentForm',
        templateUrl: 'modules/forms/views/enrollmentForm.client.view.html'
      })
      .state('exitForm', {
        url: '/exitForm',
        templateUrl: 'modules/forms/views/exitForm.client.view.html'
      })

  }
]);
