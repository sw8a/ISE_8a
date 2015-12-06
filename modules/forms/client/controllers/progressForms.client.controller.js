'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true;                                    // To allow one form to open at a time
        $scope.enterFood = false;                                   // Use to give user the options to enter food info
        $scope.feedAdjustFlag = false;                              // Flag use to override feeding adjustment in new form 
        $scope.weight = {
            lb: '',
            kg: ''
        };
        $scope.constProgForm = [];                                  // Empty array to store progress form before it is changed

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            $scope.formsLocked = $scope.formsLockedFromEditing();    // Are forms allowed to be edited?

            // Flag to prevent the user from adding a form if one is already entered
            $scope.todayFormSubmitFlag = false;
            var today = new Date();
            var lstForm = $scope.toDate($scope.activePatient.progressForms[$scope.activePatient.progressForms.length-1].dateCreated);
            if(today.getFullYear() === lstForm.getFullYear()) {
                if(today.getMonth() === lstForm.getMonth()) {
                    if(today.getDate() === lstForm.getDate()) {
                        $scope.todayFormSubmitFlag = true;
                    }
                }
            }
            

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i !== $scope.activePatient.progressForms.length; ++i) {
                // Store progress form before user make any modifications
                $scope.constProgForm[i] = $scope.activePatient.progressForms[i];

                // Add index in object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].trimDose = $scope.getTrimauxilDose($scope.activePatient.progressForms[i].weight);
                $scope.activePatient.progressForms[i].edit = false;
                $scope.activePatient.progressForms[i].feedAdjustmentFlag = false;
                $scope.activePatient.progressForms[i].foodChangedFlag = false;

                // For weight editing features
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);

                // Copy other fields for when user edit forms
                $scope.activePatient.progressForms[i].oldTrimauxilUse = $scope.activePatient.progressForms[i].trimauxilUse;
                $scope.activePatient.progressForms[i].oldfoodChanged = $scope.activePatient.progressForms[i].foodChanged;
                $scope.activePatient.progressForms[i].oldComments = $scope.activePatient.progressForms[i].comments;
                $scope.activePatient.progressForms[i].oldoverrideCupsPerFeeding = $scope.activePatient.progressForms[i].overrideCupsPerFeeding;
                $scope.activePatient.progressForms[i].oldvetID = $scope.activePatient.progressForms[i].vetID;
                $scope.activePatient.progressForms[i].oldtechID = $scope.activePatient.progressForms[i].techID;

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
            
            console.log('Update Progress Form');
            var fieldChanged = {};
            var changeMadeFlag = false;                         // Flag to check if any field was changed

            var progressFormUpdate = new ProgressFormsService({
                _id: ActivePatient.getActivePatient().progressForms[index]._id
            });

            // Add fields changed to Progress Form service
            if(this.activePatient.progressForms[index].weightKg !== this.activePatient.progressForms[index].weight) {
                fieldChanged.weight = this.activePatient.progressForms[index].weight;
                progressFormUpdate.weight = this.activePatient.progressForms[index].weightKg;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].weight = this.activePatient.progressForms[index].weightKg;
            }
            if(this.activePatient.progressForms[index].oldTrimauxilUse !== this.activePatient.progressForms[index].trimauxilUse) {
                fieldChanged.trimauxilUse = this.activePatient.progressForms[index].oldTrimauxilUse;
                progressFormUpdate.trimauxilUse = this.activePatient.progressForms[index].trimauxilUse;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldTrimauxilUse = this.activePatient.progressForms[index].trimauxilUse;
            }
            if(this.activePatient.progressForms[index].oldfoodChanged !== this.activePatient.progressForms[index].foodChanged) {
                fieldChanged.foodChanged = this.activePatient.progressForms[index].foodChanged;
                // Need to also check if food change is true
                // So that the calory can be updated as well
            }
            if(this.activePatient.progressForms[index].oldComments !== this.activePatient.progressForms[index].comments) {
                fieldChanged.comments = this.activePatient.progressForms[index].oldComments;
                progressFormUpdate.comments = this.activePatient.progressForms[index].comments;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldComments = this.activePatient.progressForms[index].comments;
            }
            if(this.activePatient.progressForms[index].oldtechID !== this.activePatient.progressForms[index].techID) {
                fieldChanged.techID = this.activePatient.progressForms[index].oldtechID;
                progressFormUpdate.techID = this.activePatient.progressForms[index].techID;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].oldtechID = this.activePatient.progressForms.techID;
            }
            if(this.activePatient.progressForms[index].oldvetID !== this.activePatient.progressForms[index].vetID) {
                fieldChanged.vetID = this.activePatient.progressForms[index].oldvetID;
                progressFormUpdate.vetID = this.activePatient.progressForms[index].vetID;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].vetID = this.activePatient.progressForms[index].oldvetID;
            }
            // Add changed old fields input to progress form
            if(changeMadeFlag === true) {
                // Add changed data to list of changed data
                progressFormUpdate.changedData = fieldChanged;
            }

            // For testing purposes, remove before deployment
            console.log('***************');
            console.log(fieldChanged);

            // Call Update field in the database

            // Update this object fields so that changes reflect on the front end
            this.activePatient.progressForms[index].edit = false;           // Set done editing flag
        };

        // Convert a lb weight to kg
        $scope.lbToKg = function(lbWeight) {
            return (lbWeight / 2.2046).toFixed(2);
        };
        // Convert a kg weight to lb
        $scope.kgToLb = function(kgWeight) {
            return (kgWeight * 2.2046).toFixed(2);
        };
        // Get last week weight
        // This function takes the index of a progress form an return the last weight
        $scope.getLastWeight = function(index) {
            var pat = ActivePatient.getActivePatient();
            // Past Forms exist
            if(pat.progressForms.length !== 0) {
                if(index === -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight;
                }
                else if(index === 0) {
                    return pat.startWeight;
                }
                else {
                    return pat.progressForms[index-1].weight;
                }
            }
            // Past Forms DO NOT exist
            else if(index === -1) {
                return pat.startWeight;
            }
            return 0;
        };

        // Compute the weight loss for that day
        // Param: weight, index of current progress form
        $scope.getTodayWeightLoss = function(todayWeight, index) {
            var pat = ActivePatient.getActivePatient();
            if(pat.progressForms.length === 0) {
                return pat.startWeight - todayWeight; 
            }
            else {
                if(index === -1) {
                    return pat.progressForms[pat.progressForms.length-1].weight - todayWeight; 
                }
                else if (index === 0) {
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
        };

        // Check if forms should be locked. Return true or false
        $scope.formsLockedFromEditing = function() {
            var pat = ActivePatient.getActivePatient();
            if(pat.exitForm !== undefined) {
                var today = Date();
                var exitDate = $scope.toDate(pat.exitForm.dateCreated);
                if($scope.getNumDays(exitDate, today)) {
                    return true;
                }
            }
            return false;
        };

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
            var res = 0;
            var pat = ActivePatient.getActivePatient();
            if (pat.progressForms.length === 0) {
                return 0;
            } else {
                var strtDate = pat.progressForms[0].dateCreated;
                var endDate = pat.progressForms[pat.progressForms.length - 1].dateCreated;
                var numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                var weightLoss = (pat.progressForms[0].weight - pat.progressForms[pat.progressForms.length - 1].weight);
                if (numWeeks === 0) { res = (weightLoss / pat.startWeight) / 1; }
                else { res = (weightLoss / pat.startWeight) / numWeeks; }
                return res.toFixed(2);
            }
        };

        $scope.getPercentWeightLoss = function() {
            console.log('Kinderley');
            console.log(this.index);
            console.log(this.weight.kg);
        };

        // Return the trimauxil dose base on today's weight
        $scope.getTrimauxilDose = function(weight) {
            var trimauxilDose = '';
            if(weight > 4 && weight <= 10) {trimauxilDose = 'S1'; }
            else if(weight > 10 && weight <= 21) {trimauxilDose = 'S2'; }
            else if(weight > 21 && weight <= 33) {trimauxilDose = 'M1'; }
            else if(weight > 33 && weight <= 55) {trimauxilDose = 'M2'; }
            else if(weight > 55 && weight <= 95) {trimauxilDose = 'L1'; }
            else if(weight > 95 && weight <= 140) {trimauxilDose = 'L2'; }
            else if(weight > 140 && weight <= 233) {trimauxilDose = 'L3'; }
            return trimauxilDose;
        };

        $scope.getIdealWeight = function () {
            var currWeight = $scope.activePatient.startWeight;
            var bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
            var idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

            return (idealWeight * 2.20462).toFixed(2);
        };

        // Editing form's input
        $scope.editForm = function(index) {
            // If forms are locked from editing. Do not allow this to execute
            if($scope.formsLocked) {
                this.activePatient.progressForms[index].edit = false;
            }
            else {
                this.activePatient.progressForms[index].edit = true;
            }
        };

        // Cancel editing on forms
        $scope.cancelEditing = function(index) {

            // Reset form fields to original
            this.activePatient.progressForms[index].edit = false;
            this.activePatient.progressForms[index].weightKg = this.activePatient.progressForms[index].weight;
            this.activePatient.progressForms[index].weightLb = $scope.kgToLb(this.activePatient.progressForms[index].weight);
            this.activePatient.progressForms[index].trimauxilUse = this.activePatient.progressForms[index].oldTrimauxilUse;
            this.activePatient.progressForms[index].foodChanged = this.activePatient.progressForms[index].oldfoodChanged;
            this.activePatient.progressForms[index].comments = this.activePatient.progressForms[index].oldComments;
        };
    }
]);