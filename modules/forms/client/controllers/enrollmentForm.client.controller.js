'use strict';

angular.module('core').controller('enrollmentFormController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
        firstName: "",
        age: 7,
        sex:"M",
        castrated: "N",
        breed: "",
        foodBrand: "",
        cups: 2,
        perDay: 3,
        treatsAndScraps: "",
        currentMedications: "",
        significantMedicalHistory: "",
        significantPEFindings: "",
        todayWeight: 50,
        BCS: 5
    };

    $scope.patientInfo.idealWeight = function () {
        var currWeight = $scope.patientInfo.todayWeight;
        var bodyFat = $scope.patientInfo.BCS * 5; // Assumes each BCS equals 5% body fat
        var idealWeight = currWeight * (100-bodyFat)/100 / .8;

        return idealWeight.toFixed(3); // Ask about how many decimal places they want
    }

    $scope.patientInfo.cupsPerFeeding = function () {
        var dailykCalIdealWeight = 600; // Use Recommended Daily Caloric Intake for Ideal Weight Chart
        var kCalPerCup = 150; // Eventually need to find on food database
        var cupsPerDay = dailykCalIdealWeight/kCalPerCup;
        var perDay = $scope.patientInfo.perDay;
        var cupsPerFeeding = cupsPerDay/perDay;

        return cupsPerFeeding.toFixed(3); // Ask about how many decimal places they want
    }

    $scope.vetApproval = {
        vetSignature: "",
        continueWithTrimauxil: "Y"
    }

    $scope.finalApproval = {
        technician: "",
        veterinarian: "",
        reviewer: ""
    }
  }
]);
