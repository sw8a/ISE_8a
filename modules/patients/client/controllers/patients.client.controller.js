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

        var progressForms = $scope.activePatient.progressForms;
        var monthStarted = Number($scope.activePatient.dateCreated.substring(5,7));
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var idealWeights = [100,95,90,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,5];
        var monthsShown = [];
        var weightsShown = [];
        var idealWeightsShown = [];

        var kgToLb = 2.2046; // kg * 2.2046 = lb

        monthsShown.push(months[monthStarted-1]);
        weightsShown.push($scope.activePatient.startWeight);
        idealWeightsShown.push(idealWeights[0]);

        for(var i = 0; i < progressForms.length; i++) {
          monthsShown.push(months[Number(progressForms[i].dateCreated.substring(5,7))-1]);
          weightsShown.push(progressForms[i].weight * kgToLb);
          idealWeightsShown.push(idealWeights[i+1] * kgToLb);
        }

        $scope.labelsLine = monthsShown;
        $scope.colorsLine = ['#6399CC', '#505050'];
        $scope.seriesLine = ['Current Weight', 'Ideal Weight'];
        $scope.dataLine = [
            weightsShown,
            idealWeightsShown
        ];

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
            var currWeight = $scope.activePatient.startWeight;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            return (idealWeight).toFixed(2);
        };

        // Weight Lost vs. Pounds To Go Doughnut Graph
        $scope.labelsDoughnut = ['Total Weight Lost', 'Pounds To Go'];
        $scope.dataDoughnut = [(($scope.activePatient.startWeight * kgToLb) - $scope.weight).toFixed(2), ($scope.weight-$scope.idealWeight()).toFixed(2)];
        $scope.colorsDoughnut = ['#6399CC', '#505050'];
    }
]);
