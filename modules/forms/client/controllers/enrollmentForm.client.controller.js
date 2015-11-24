'use strict';

angular.module('forms').controller('enrollmentFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'EnrollmentFormsService', 'PatientsService', 'PracticesService', 'ActivePatient',
    function($scope, Authentication, $location, $stateParams, EnrollmentFormsService, PatientsService, PracticesService, ActivePatient) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        console.log($scope.authentication);
        if (!$scope.authentication.user) {
            $location.path('/');
            console.log($scope.authentication);
        }

    $scope.activePatient = ActivePatient.getActivePatient();

    $scope.practiceInfo = {
        preferredUnit: "kg"
    };

    $scope.firstName = $scope.activePatient.firstName;
    $scope.patientId = $scope.activePatient.patientId;
    $scope.birthDate = $scope.activePatient.birthDate;
    $scope.startWeight = $scope.activePatient.startWeight;
    $scope.sex = $scope.activePatient.sex;
    $scope.fixed = $scope.activePatient.fixed;
    $scope.breed = $scope.activePatient.breed;
    $scope.bcs = $scope.activePatient.bcs;

    if($scope.firstName) {
      $scope.disableInput = true;
    }
    else {
      $scope.disableInput = false;
    }

    $scope.editForm = function() {
      $scope.disableInput = false;
    }
    $scope.cancelEdit = function() {
      $scope.disableInput = true;
    }

    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.todayDate = today;

    $scope.initPatient = function() {
        $scope.activePatient = ActivePatient.getActivePatient();
    };

    $scope.createEnrollmentForm = function() {

        var patient = new PatientsService({
          dateCreated: $scope.todayDate,
          firstName: this.firstName,
          patientId: this.patientId,
          birthDate: this.birthDate,
          sex: this.sex,
          fixed: this.fixed,
          breed: this.breed,
          startWeight: this.startWeight,
          bcs: this.bcs,
          practice: ActivePatient.getActivePractice()._id
        });

        var enrollmentForm = new EnrollmentFormsService({
          treats: this.treats,
          currentMedications: this.currentMedications,
          medicalHistory: this.medicalHistory,
          peFindings: this.peFindings,
          techId: this.techId,
          vetId: this.vetId
        });

        patient.$save(function(patientResponse) {
          ActivePatient.setActivePatient(patientResponse);

          var practice = new PracticesService({
              _id: ActivePatient.getActivePractice()._id,
              newPatient: patientResponse._id
          });

          practice.$update(function(updatePracticeResponse) {
              ActivePatient.updateActivePractice();
          });
        });
      });
    };

    // Do they want some prepopulated values?
    $scope.patientInfo = {
        DOB: new Date(2013, 9, 22)
    };

    $scope.patientInfo.age = function () {
      var DOB = $scope.patientInfo.DOB; //$scope.activePatient.birthDate
      var age = $scope.yearDifference({year: DOB.getFullYear(), month: DOB.getMonth()+1, day: DOB.getDate()});
      return age;
    };

    $scope.patientInfo.idealWeight = function () {
      if($scope.disableInput) {
        var currWeight = $scope.activePatient.startWeight;
        var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
        var idealWeight = currWeight * (100-bodyFat)/100 / 0.8;

        if($scope.practiceInfo.preferredUnit === "kg") {
          return idealWeight.toFixed(2);
        }
        else {
          return (idealWeight*2.20462).toFixed(2);
        }
      }
      else {
        var currWeight = $scope.startWeight;
        var bodyFat = $scope.bcs * 5; // Assumes each BCS equals 5% body fat
        var idealWeight = currWeight * (100-bodyFat)/100 / 0.8;

        if($scope.practiceInfo.preferredUnit === "kg") {
          return idealWeight.toFixed(2);
        }
        else {
          return (idealWeight*2.20462).toFixed(2);
        }
      }
    };

    $scope.patientInfo.cupsPerFeeding = function () {
        var dailykCalIdealWeight = 600; // Use Recommended Daily Caloric Intake for Ideal Weight Chart
        var kCalPerCup = 150; // Eventually need to find on food database
        var cupsPerDay = dailykCalIdealWeight/kCalPerCup;
        var perDay = $scope.patientInfo.perDay;
        var cupsPerFeeding = cupsPerDay/perDay;

        return cupsPerFeeding.toFixed(2);
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
        if (now.month < date.month || now.month === date.month && now.day < date.day) {
          diff -= 1;
        }

        return diff;
    };
  }
]);
