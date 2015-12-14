'use strict';

angular.module('patients', ['chart.js']).controller('patientsController', ['$scope', 'Authentication', '$location', '$stateParams', 'PatientsService', 'ActivePatient', /*'$localStorage',*/
    function($scope, Authentication, $location, $stateParams, PatientsService, ActivePatient) {

        $scope.authentication = Authentication;

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
