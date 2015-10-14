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
        templateUrl: 'modules/patients/views/overview.client.view.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      })
      .state('overview', {
        url: '/overview',
        templateUrl: 'modules/patients/views/overview.client.view.html'
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
      .state('vetHomepage', {
        url: '/vetHomepage',
        templateUrl: 'modules/doctors/views/vetHomepage.client.view.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/forms/views/login.client.view.html'
      })
  }
]);
