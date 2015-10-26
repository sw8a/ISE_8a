'use strict';

angular.module('core').controller('enrollmentFormController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.todayDate = today;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
        firstName: "",
        DOB: new Date(2013, 9, 22),
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

    $scope.patientInfo.age = function () {
      var DOB = $scope.patientInfo.DOB;
      var age = $scope.yearDifference({year: DOB.getFullYear(), month: DOB.getMonth()+1, day: DOB.getDate()})
      return age;
    };

    $scope.patientInfo.idealWeight = function () {
        var currWeight = $scope.patientInfo.todayWeight;
        var bodyFat = $scope.patientInfo.BCS * 5; // Assumes each BCS equals 5% body fat
        var idealWeight = currWeight * (100-bodyFat)/100 / .8;

        return idealWeight.toFixed(2); // Ask about how many decimal places they want
    };

    $scope.patientInfo.cupsPerFeeding = function () {
        var dailykCalIdealWeight = 600; // Use Recommended Daily Caloric Intake for Ideal Weight Chart
        var kCalPerCup = 150; // Eventually need to find on food database
        var cupsPerDay = dailykCalIdealWeight/kCalPerCup;
        var perDay = $scope.patientInfo.perDay;
        var cupsPerFeeding = cupsPerDay/perDay;

        return cupsPerFeeding.toFixed(2); // Ask about how many decimal places they want
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
        if (now.month < date.month ||
            now.month === date.month && now.day < date.day) {
          diff -= 1;
        }

        return diff;
    }

    $scope.vetApproval = {
        vetSignature: "",
        continueWithTrimauxil: "Y"
    };

    $scope.finalApproval = {
        technician: "",
        veterinarian: "",
        reviewer: ""
    };
  }
]);
