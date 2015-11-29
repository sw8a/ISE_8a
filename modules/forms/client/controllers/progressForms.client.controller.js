'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true; // To allow one form to open at a time
        $scope.disableField = true; // Disable field if not in 'Editing' State
        $scope.enterFood = false;   // Use to give user the options to enter food info
        $scope.weight = {
            lb: '',
            kg: ''
        };

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            $scope.formsLocked = $scope.formsLockedFromEditing();       // Are forms allowed to be edited?
            $scope.formsEdited;

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i != $scope.activePatient.progressForms.length; ++i) {
                // Add index in object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].trimDose = $scope.getTrimauxilDose($scope.activePatient.progressForms[i].weight);
                $scope.activePatient.progressForms[i].edit = false;

                // For editing features
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);
                console.log($scope.activePatient.progressForms[i].weight);
            }
        };

        // Create new progress form
        $scope.createProgressForm = function() {
            // Create new ProgressForm object

            console.log('create p form');

            var progressForm = new ProgressFormsService({
                weight: this.weight.kg,
                trimauxilUse: this.trimauxilUse,
                weightLossAppropriate: this.weightLossAppropriate,
                foodChanged: this.foodChanged,
                comments: this.comments,
                techID: this.techID,
                vetID: this.vetID,
                patient: ActivePatient.getActivePatient()._id
            });

            progressForm.$save(function(progressFormResponse) {
                // Function that is executed after save

                console.log('saved p form');

                var patient = new PatientsService({
                    _id: ActivePatient.getActivePatient()._id,
                    newProgressForm: progressFormResponse._id,
                    formSave: true
                });

                patient.$update(function(patientAddFormResponse) {
                    ActivePatient.setPatientNeedsUpdate();
                    // Redirect to overview
                    $location.path('/overview');
                });
            });
        };

        // Update progress Forms
        $scope.updateProgressForm = function(index) {
            console.log("Update Progress Form");
            var fieldChanged = new Object();
            var object = this.activePatient.progressForms[index];

            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    var tmp = object[property];
                    console.log("Loop reached");
                    fieldChanged.object.property = object.property;
                }
            }

            console.log("***************");
            console.log(fieldChanged);
        };

        // Convert a lb weight to kg
        $scope.lbToKg = function(lbWeight) {
            return (lbWeight / 2.2046).toFixed(2);
        }
        // Convert a kg weight to lb
        $scope.kgToLb = function(kgWeight) {
            return (kgWeight * 2.2046).toFixed(2);
        }
        // Get last week weight
        // This function takes the index of a progress form an return the last weight
        $scope.getLastWeight = function(index) {
            var pat = ActivePatient.getActivePatient();
            // Past Forms exist
            if(pat.progressForms.length != 0) {
                if(index == -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight;
                }
                else if(index == 0) {
                    return pat.startWeight;
                }
                else {
                    return pat.progressForms[index-1].weight;
                }
            }
            // Past Forms DO NOT exist
            else if(index == -1) {
                return pat.startWeight;
            }
            return 0;
        }

        // Compute the weight loss for that day
        // Param: weight, index of current progress form
        $scope.getTodayWeightLoss = function(todayWeight, index) {
            var pat = ActivePatient.getActivePatient();
            if(pat.progressForms.length == 0) {
                return pat.startWeight - todayWeight; 
            }
            else {
                if(index == -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight - todayWeight; 
                }
                else if (index == 0) {
                    return pat.startWeight - pat.progressForms[index].weight;
                }
                else {
                    return pat.progressForms[index-1].weight - pat.progressForms[index].weight;
                }
            }
            return 0;
        };

        // Function to parse a given string to Date format
        // Date must be in default format: YYYY-MM-DD ...
        $scope.toDate = function(strDate) {
            var tmp = new Date();
            var year = parseInt(strDate.substring(0,4));
            var month = parseInt(strDate.substring(5,7)) - 1;
            var day = parseInt(strDate.substring(8,10));
            tmp.setFullYear(year);
            tmp.setMonth(month);
            tmp.setDate(day);
            return tmp;
        }

        // Check if forms should be locked. Return true or false
        $scope.formsLockedFromEditing = function() {
            var pat = ActivePatient.getActivePatient();
            if(pat.exitForm != undefined) {
                var today = Date();
                var exitDate = $scope.toDate(pat.exitForm.dateCreated);
                if(getNumDays(exitDate, today)) {
                    return true;
                }
            }
            return false;
        }

        // Function borrowed online to compute number of weeks between two dates
        $scope.getNumDays = function(firstDate, secondDate) {
            var oneDay = 24*60*60*1000;          // hours*minutes*seconds*milliseconds
            var strtDate = $scope.toDate(firstDate);
            var endDate = $scope.toDate(secondDate);
            return Math.round(Math.abs((strtDate.getTime() - endDate.getTime())/(oneDay)));
        };

        // Compute the average weight loss
        // Average does not take into account the current date entered today
        $scope.getAvgWeightLossPerWeek = function() {
            var pat = ActivePatient.getActivePatient();
            if (pat.progressForms.length == 0) {
                return 0;
            } else {
                var strtDate = pat.progressForms[0].dateCreated;
                var endDate = pat.progressForms[pat.progressForms.length - 1].dateCreated;
                var numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                var weightLoss = (pat.progressForms[0].weight - pat.progressForms[pat.progressForms.length - 1].weight);
                if (numWeeks == 0) { var res = (weightLoss / pat.startWeight) / 1; }
                else { var res = (weightLoss / pat.startWeight) / numWeeks; }
                return res.toFixed(2);
            }
        };

        $scope.getPercentWeightLoss = function() {
            console.log("Kinderley");
            console.log(this.index);
            console.log(this.weight.kg);
        }

        // Return the trimauxil dose base on today's weight
        $scope.getTrimauxilDose = function(weight) {
            var trimauxilDose = " ";
            if(weight > 4 && weight <= 10) {trimauxilDose = "S1"; }
            else if(weight > 10 && weight <= 21) {trimauxilDose = "S2"; }
            else if(weight > 21 && weight <= 33) {trimauxilDose = "M1"; }
            else if(weight > 33 && weight <= 55) {trimauxilDose = "M2"; }
            else if(weight > 55 && weight <= 95) {trimauxilDose = "L1"; }
            else if(weight > 95 && weight <= 140) {trimauxilDose = "L2"; }
            else if(weight > 140 && weight <= 233) {trimauxilDose = "L3"; }
            return trimauxilDose;
        };

        // Editing form's input
        $scope.editForm = function(index) {
            // If forms are locked from editing. Do not allow this to execute
            if($scope.formsLocked) {
                $scope.disableField = true;
                this.activePatient.progressForms[index].edit = false;
            }
            else {
                $scope.disableField = false;
                this.activePatient.progressForms[index].edit = true;
            }
        };

        // Cancel editing on forms
        $scope.cancelEditing = function(index) {
            $scope.disableField = true;
            this.activePatient.progressForms[index].edit = false;
            this.activePatient.progressForms[index].weightKg = this.activePatient.progressForms[index].weight;
            this.activePatient.progressForms[index].weightLb = $scope.kgToLb(this.activePatient.progressForms[index].weight);
        };
    }
]);