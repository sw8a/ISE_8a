'use strict';

angular.module('patients', ['chart.js'/*, 'ngStorage'*/]).controller('patientsController', ['$scope', 'Authentication', '$location', '$stateParams', 'PatientsService', 'ActivePatient', /*'$localStorage',*/
    function($scope, Authentication, $location, $stateParams, /*$localStorage, */PatientsService, ActivePatient) {

        $scope.authentication = Authentication;

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            //console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
        };

        $scope.activePatient = ActivePatient.getActivePatient();

        var kgToLb = 2.2046; // kg * 2.2046 = lb

        $scope.weight = $scope.activePatient.startWeight * kgToLb;
        if($scope.activePatient.progressForms.length) {
          $scope.weight = $scope.activePatient.progressForms[$scope.activePatient.progressForms.length - 1].weight * kgToLb;
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

        $scope.imageURL = 'modules/patients/img/' + $scope.trimauxilSKU() + '.png';

        $scope.idealWeight = function () {
            var currWeight = $scope.activePatient.startWeight * kgToLb;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            return (idealWeight).toFixed(2);
        };

        // Line Graph
        var progressForms = $scope.activePatient.progressForms;
        var monthStarted = Number($scope.activePatient.dateCreated.substring(5,7));
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var monthsShown = [];
        var weightsShown = [];
        var trendOne = [];
        var trendTwo = [];
        var lastMonthShown = 0;
        var percentLoss1 = 0.95;
        var percentLoss2 = 0.90;

        monthsShown.push(months[monthStarted-1]);
        weightsShown.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));
        trendOne.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));
        trendTwo.push(($scope.activePatient.startWeight * kgToLb).toFixed(2));

        for(var i = 0; i < progressForms.length; i++) {
          monthsShown.push(months[(Number(progressForms[i].dateCreated.substring(5,7))-1)%12]);
          weightsShown.push((progressForms[i].weight * kgToLb).toFixed(2));
          trendOne.push((progressForms[i].weight * kgToLb).toFixed(2));
          trendTwo.push((progressForms[i].weight * kgToLb).toFixed(2));
          if(i == progressForms.length-1) {
            lastMonthShown = Number(progressForms[i].dateCreated.substring(5,7));
          }
        }

        var i = 0;
        while(trendOne[trendOne.length-1] * percentLoss1 > $scope.idealWeight()) {
          monthsShown.push(months[(lastMonthShown+i)%12]);
          trendOne.push((trendOne[trendOne.length-1] * percentLoss1 * kgToLb).toFixed(2));
          trendTwo.push((trendTwo[trendTwo.length-1] * percentLoss2 * kgToLb).toFixed(2));
          i++;
        }

        $scope.labelsLine = monthsShown;
        $scope.colorsLine = ['#6399CC', '#505050','#757575'];
        $scope.seriesLine = ['Current Weight', '5% Loss','10% Loss'];
        $scope.dataLine = [
            weightsShown,
            trendOne,
            trendTwo
        ];

        // Weight Lost vs. Pounds To Go Doughnut Graph
        $scope.labelsDoughnut = ['Total Weight Lost', 'Pounds To Go'];
        $scope.dataDoughnut = [(($scope.activePatient.startWeight * kgToLb) - $scope.weight).toFixed(2), ($scope.weight-$scope.idealWeight()).toFixed(2)];
        $scope.colorsDoughnut = ['#6399CC', '#505050'];
    }
]);
