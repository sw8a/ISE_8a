'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true;                                    // To allow one form to open at a time
        $scope.enterFood = false;                                   // Use to give user the options to enter food info
        $scope.feedAdjustFlag = false;                              // Flag use to override feeding adjustment in new form 
        $scope.constProgForm = [];                                  // Empty array to store progress form before it is changed
        
        // Fields for use in automatic conversion when entering weight in New progress form
        $scope.weight = {
            lb: '',
            kg: ''
        };


        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            $scope.formsLocked = $scope.formsLockedFromEditing();            // Are forms allowed to be edited?

            // Flag to prevent the user from adding a form if one is already entered
            $scope.todayFormSubmitFlag = false;
            if($scope.activePatient.progressForms === undefined || $scope.activePatient.progressForms.length === 0) {
                $scope.todayFormSubmitFlag = false;
            }
            else{
                var today = new Date();
                var lstForm = $scope.toDate($scope.activePatient.progressForms[$scope.activePatient.progressForms.length-1].dateCreated);
                if(today.getFullYear() === lstForm.getFullYear()) {
                    if(today.getMonth() === lstForm.getMonth()) {
                        if(today.getDate() === lstForm.getDate()) {
                            $scope.todayFormSubmitFlag = true;
                        }
                    }
                }
            }

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i !== $scope.activePatient.progressForms.length; ++i) {
                // Add necessary index and necessary flag to each progress form object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].edit = false;
                if($scope.activePatient.progressForms[i].overrideCupsPerFeeding === undefined &&
                    $scope.activePatient.progressForms[i].vetIdOverrideCPF === undefined) {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = false;
                }
                else {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = true;
                }
                $scope.activePatient.progressForms[i].feedAdjustmentFlag = true;
                $scope.activePatient.progressForms[i].foodChangedFlag = false;

                // For weight editing features in Adding new form
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);


                // Copy all the progress forms before user makes any modifications to them
                $scope.constProgForm[i] = new Object({
                    index:i,
                    edit: false,
                    weight:{
                        weigthKg:$scope.activePatient.progressForms[i].weight,
                        weightLb:$scope.kgToLb($scope.activePatient.progressForms[i].weight)
                    },
                    trimauxilUse:$scope.activePatient.progressForms[i].trimauxilUse,
                    feedAdjustmentFlag: $scope.activePatient.progressForms[i].feedAdjustmentFlag,
                    overrideCupsPerFeeding: $scope.activePatient.progressForms[i].overrideCupsPerFeeding,
                    vetIdOverrideCPF: $scope.activePatient.progressForms[i].vetIdOverrideCPF,
                    foodChanged:$scope.activePatient.progressForms[i].foodChanged,
                    kcalPerCup: 0,
                    kcalPerKg: 0,
                    comments: $scope.activePatient.progressForms[i].comments,
                    techID: $scope.activePatient.progressForms[i].techID,
                    vetID: $scope.activePatient.progressForms[i].vetID,
                    dateCreated: $scope.activePatient.progressForms[i].dateCreated
                });

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
                overrideCupsPerFeeding: this.overrideCupsPerFeeding,
                vetIdOverrideCPF: this.vetIdOverrideCPF,
                foodChanged: this.foodChanged,
                comments: this.comments,
                techId: this.techId,
                vetId: this.vetId,
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
            var fieldChanged = {};                              // Object containing old values before the fields were changed
            var changeMadeFlag = false;                         // Flag to check if any field was changed

            var progressFormUpdate = new ProgressFormsService({
                _id: ActivePatient.getActivePatient().progressForms[index]._id
            });

            // Add fields changed to Progress Form service
            if(this.activePatient.progressForms[index].weightKg !== this.activePatient.progressForms[index].weight) {
                fieldChanged.weight = $scope.constProgForm[index].weight.weightKg;
                progressFormUpdate.weight = this.activePatient.progressForms[index].weightKg;
                changeMadeFlag = true;
                this.activePatient.progressForms[index].weight = this.activePatient.progressForms[index].weightKg;
            }
            // Trimauxil Use
            if($scope.constProgForm[index].trimauxilUse !== this.activePatient.progressForms[index].trimauxilUse) {
                fieldChanged.trimauxilUse = $scope.constProgForm[index].trimauxilUse;
                progressFormUpdate.trimauxilUse = this.activePatient.progressForms[index].trimauxilUse;
                changeMadeFlag = true;
            }
            // Feeding adjustment needed edited
            if(this.activePatient.progressForms[index].feedAdjustmentFlag === true){
                fieldChanged.overrideCupsPerFeeding = $scope.constProgForm[index].overrideCupsPerFeeding;
                fieldChanged.vetIdOverrideCPF = $scope.constProgForm[index].vetIdOverrideCPF;
                progressFormUpdate.overrideCupsPerFeeding = this.activePatient.progressForms[index].overrideCupsPerFeeding;
                progressFormUpdate.overrideCupsPerFeeding = this.activePatient.progressForms[index].vetIdOverrideCPF;
                changeMadeFlag = true;
            }
            // Food changed edited
            if($scope.constProgForm[index].foodChanged !== this.activePatient.progressForms[index].foodChanged) {
                fieldChanged.foodChanged = $scope.constProgForm[index].foodChanged;
                progressFormUpdate.foodChanged = this.activePatient.progressForms[index].foodChanged;
                changeMadeFlag = true;
                // New food information needed?
                if(this.activePatient.progressForms[index].foodChanged === true) {
                    // Add new kcal/cup and kcal/kg to food collection
                    console.log('Update the food database with the new food information');
                }
            }
            // Comments edited
            if($scope.constProgForm[index].comments !== this.activePatient.progressForms[index].comments) {
                fieldChanged.comments = $scope.constProgForm[index].comments;
                progressFormUpdate.comments = this.activePatient.progressForms[index].comments;
                changeMadeFlag = true;
            }
            // Tech ID edited
            if($scope.constProgForm[index].techID !== this.activePatient.progressForms[index].techID) {
                fieldChanged.techID = $scope.constProgForm[index].techID;
                progressFormUpdate.techID = this.activePatient.progressForms[index].techID;
                changeMadeFlag = true;
            }
            // Vet ID edited
            if($scope.constProgForm[index].vetID !== this.activePatient.progressForms[index].vetID) {
                fieldChanged.vetID = $scope.constProgForm[index].vetID;
                progressFormUpdate.vetID = this.activePatient.progressForms[index].vetID;
                changeMadeFlag = true;
            }
            // Add changed old fields input to progress form
            if(changeMadeFlag === true) {
                // Add changed data to list of changed data
                progressFormUpdate.changedData = fieldChanged;
            }

            // For testing purposes, remove before deployment
            console.log('***************');
            console.log(fieldChanged);


            // Call necessary update function in database here


            
            this.activePatient.progressForms[index].edit = false;           // Set done editing flag
        };

        // Find out if food was adjusted
        // Need to display on the form whether it was yes or false.
        // Reason: Field is not stored in Database
        $scope.isFeedingAjusted = function(index) {
            var pat = ActivePatient.getActivePatient();
            if(pat.progressForms[index].overrideCupsPerFeeding === undefined &&
                pat.progressForms[index].vetIdOverrideCPF === undefined) {
                return true;
            }
            return false;
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
            if(pat.progressForms === undefined) {
                return pat.startWeight;
            }
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
            // IF no progress EXIST yet
            if(pat.progressForms === undefined) {
                return pat.startWeight - todayWeight;
            }

            // IF progress form exist
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
        // Based on 60 threshold of today's date and the exit form date completion
        $scope.formsLockedFromEditing = function() {
            var pat = ActivePatient.getActivePatient();
            if(pat.exitForm !== undefined) {
                var today = Date();
                var exitDate = $scope.toDate(pat.exitForm.dateCreated);
                if($scope.getNumDays(exitDate, today) === 60) {
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

        // When user clicks edit button
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
            // Reset form fields to original value due to user canceling changes
            this.activePatient.progressForms[index].edit = false;
            this.activePatient.progressForms[index].weightKg = $scope.constProgForm[index].weight.weightKg;
            this.activePatient.progressForms[index].weightLb = $scope.constProgForm[index].weight.weightLb;
            this.activePatient.progressForms[index].trimauxilUse = $scope.constProgForm[index].trimauxilUse;
            this.activePatient.progressForms[index].overrideCupsPerFeeding = $scope.constProgForm[index].overrideCupsPerFeeding;
            this.activePatient.progressForms[index].vetIdOverrideCPF = $scope.constProgForm[index].vetIdOverrideCPF;
            this.activePatient.progressForms[index].foodChanged = $scope.constProgForm[index].foodChanged;
            this.activePatient.progressForms[index].comments = $scope.constProgForm[index].comments;
            this.activePatient.progressForms[index].techID = $scope.constProgForm[index].techID;
            this.activePatient.progressForms[index].vetID = $scope.constProgForm[index].vetID;
            this.activePatient.progressForms[index].dateCreated = $scope.constProgForm[index].dateCreated;
        };
    }
]);