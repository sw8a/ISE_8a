'use strict';

angular.module('core').controller('exitFormController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
        endingReason: "Reached ideal weight",
        endingReasonOther: "",
        startWeight: 50,
        finalWeight: 20,
        startBCS: 3,
        finalBCS: 5,
        foodBrand: "",
        cups: 2,
        perDay: 3,
    };

    $scope.patientInfo.weightLossTotal = function () {
        var startWeight = $scope.patientInfo.startWeight;
        var finalWeight = $scope.patientInfo.finalWeight;

        return (startWeight-finalWeight).toFixed(3);
    }

    $scope.ownerQuestions = {
        name: "",
        easyToAdminister: "Somewhat easy",
        easyAdjustment: "After a few days",
        positiveImpact: "Y",
        ownerComments: "",
    };

    $scope.finalApproval = {
        technician: "",
        veterinarian: "",
        reviewer: ""
    }
  }
]);
