'use strict';

angular.module('patients', ['chart.js']).controller('overviewController', ['$scope',
  function ($scope) {
      console.log("HI");
      $scope.labelsLine = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.colorsLine = ['#6399CC', '#505050'];
      $scope.seriesLine = ['Current Weight', 'Ideal Weight'];
      $scope.dataLine = [
                        [100, 96, 89, 82, 75, 68, 62],
                        [100, 95, 87, 80, 74, 65, 60]
      ];

      $scope.labelsDoughnut = ["Total Weight Lost", "Pounds To Go"];
      $scope.dataDoughnut = [6.9, 40];
      $scope.colorsDoughnut = ['#6399CC', '#505050'];
  }
]);
