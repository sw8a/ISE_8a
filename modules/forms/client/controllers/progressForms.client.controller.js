'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'DogFoodService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, DogFoodService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.oneAtTime = true;                                        // To allow one form to open at a time
        $scope.enterFood = false;                                       // Use to give user the options to enter food info
        $scope.feedAdjustFlag = false;                                  // Flag use to override feeding adjustment in new form 
        $scope.constProgForm = [];                                      // Empty array to store progress form before it is changed
        $scope.dateCreated = new Date();                                // Today's date for new forms
        $scope.selectedFood = '';                                       // Use for user's food selection
        $scope.dogFoodNames = [];

        // Fields for use in automatic conversion when entering weight in New progress form
        $scope.weight = {
            lb: '',
            kg: ''
        };


        if (!$scope.authentication.user) {
            $location.path('/');
        }

        // Purpose:     Check if all visit forms shoulc be locked from edititing
        //              based on 60 days after exit form has been completed
        // Paramters:   None
        // Return:      Bool
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
                dateCreated: this.dateCreated,
                patient: ActivePatient.getActivePatient()._id
            });

            progressForm.$save(function(progressFormResponse) {
                // Function that is executed after save

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
            var changedData = {
                _id:  $scope.activePatient.progressForms[index]._id
            };  // Object containing old values before the fields were changed
            var oldData = {};
            var formChanged = false; // Flag to check if any field was changed

            

            // Add fields changed to Progress Form service
            if($scope.constProgForm[index].weight.weightKg !== $scope.activePatient.progressForms[index].weightKg-0) {
                oldData.weight = $scope.constProgForm[index].weight.weightKg;
                changedData.weight = $scope.activePatient.progressForms[index].weightKg-0;
                $scope.activePatient.progressForms[index].weight = changedData.weight;
                formChanged = true;
                //this.activePatient.progressForms[index].weight = this.activePatient.progressForms[index].weightKg;
            }
            // Trimauxil Use
            if($scope.constProgForm[index].trimauxilUse !== $scope.activePatient.progressForms[index].trimauxilUse) {
                oldData.trimauxilUse = $scope.constProgForm[index].trimauxilUse;
                changedData.trimauxilUse = $scope.activePatient.progressForms[index].trimauxilUse;
                formChanged = true;
            }
            /* Assess this
            // Feeding adjustment needed edited
            if(this.activePatient.progressForms[index].feedAdjustmentFlag === true){
                changedData.overrideCupsPerFeeding = $scope.constProgForm[index].overrideCupsPerFeeding;
                changedData.vetIdOverrideCPF = $scope.constProgForm[index].vetIdOverrideCPF;
                oldData.overrideCupsPerFeeding = this.activePatient.progressForms[index].overrideCupsPerFeeding;
                oldData.overrideCupsPerFeeding = this.activePatient.progressForms[index].vetIdOverrideCPF;
                formChanged = true;
            }*/
            // Food changed edited
            if($scope.constProgForm[index].foodChanged !== $scope.activePatient.progressForms[index].foodChanged) {
                oldData.foodChanged = $scope.constProgForm[index].foodChanged;
                changedData.foodChanged = $scope.activePatient.progressForms[index].foodChanged;
                formChanged = true;
                // New food information needed?
                if(this.activePatient.progressForms[index].foodChanged === true) {
                    // Add new kcal/cup and kcal/kg to food collection
                    console.log('Update the food database with the new food information');
                }
            }
            // Comments edited
            if($scope.constProgForm[index].comments !== $scope.activePatient.progressForms[index].comments) {
                oldData.comments = $scope.constProgForm[index].comments;
                changedData.comments = $scope.activePatient.progressForms[index].comments;
                formChanged = true;
            }
            // Tech ID edited
            if($scope.constProgForm[index].techID !== $scope.activePatient.progressForms[index].techID) {
                oldData.techID = $scope.constProgForm[index].techID;
                changedData.techID = $scope.activePatient.progressForms[index].techID;
                formChanged = true;
            }
            // Vet ID edited
            if($scope.constProgForm[index].vetID !== $scope.activePatient.progressForms[index].vetID) {
                oldData.vetID = $scope.constProgForm[index].vetID;
                changedData.vetID = $scope.activePatient.progressForms[index].vetID;
                formChanged = true;
            }
            // Add changed old fields input to progress form
            if(formChanged === true) {
                changedData.changedData = oldData;
                var progressFormUpdate = new ProgressFormsService(changedData);
                console.log('progress form edit:');
                console.log(progressFormUpdate);
                console.log(changedData);
                progressFormUpdate.$update(function(progressFormUpdateResponse) {
                    $scope.activePatient.progressForms[index].edit = false;   // Set done editing flag
                    //$scope.activePatient = ActivePatient.setPatientNeedsUpdate();
                });
            }
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

        // Purpose: This function takes the index of a progress form 
        //          and return the weight of the progress form at index - 1
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

        // Purpose:     Compute the weight loss for that day
        // Parameters:  Weight, index of current progress form
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


        // Purpose:     To parse a given string to Date format
        // Parameters:  strDate (Must be a string date in JSON format: YYYY-MM-DDT00:00:000Z)
        // Return:      Date object
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

        // Purpose:     To compute the between 2 given dates
        // Parameters:  Date String, Date String  
        // Borrowed:    StackOverflow
        // Return:      Number of days (Int)
        $scope.getNumDays = function(firstDate, secondDate) {
            var oneDay = 24*60*60*1000;          // hours*minutes*seconds*milliseconds
            var strtDate = $scope.toDate(firstDate);
            var endDate = $scope.toDate(secondDate);
            return Math.round(Math.abs((strtDate.getTime() - endDate.getTime())/(oneDay)));
        };


        // Purpose:     Compute the average weight loss per week of a dog
        // Parameters:  Today's weight and the index of the progress form.
        // Description: This function is used by new form and past progress forms.
        //              An index of -1 means it is from New Progress form. Any other index
        //              means that call is from past progress forms
        // Average does not take into account the current date entered today
        $scope.getAvgWeightLossPerWeek = function(todayWeight, index) {
            var tmp;
            var res = 0;
            var strtDate;
            var endDate;
            var numWeeks;
            var pat = ActivePatient.getActivePatient();
            if(todayWeight === undefined) { return 0; }

            // Compute other total percent weight loss per visit
            // % Weight loss per visit = [(Previous weight - Current Weight) / Previous Weight] * 100
            // Average % Weight Loss = (% Weight Loss per visit) / (Days since last weight/7)

            // Case A: No progress form yet, call is coming from first progress form
            if( (pat.progressForms === undefined) || (pat.progressForms.length === 0) ){
                tmp = ( ((pat.startWeight - todayWeight) * 100) / pat.startWeight).toFixed(2);
                strtDate = pat.dateCreated;                                                     // Date of last weight
                endDate = $scope.dateCreated.toJSON();
                numWeeks = $scope.getNumDays(strtDate, endDate) / 7;

                // IF a week has not passed yet
                if(numWeeks < 1) {
                    res = 0;
                }
                else{
                    res = (tmp / numWeeks).toFixed(2);
                }
            }
            
            // Case B: Progress forms exist
            else {

                // Case 1: Calling from new progress form
                if(index === -1) {
                    strtDate = pat.progressForms[pat.progressForms.length - 1].dateCreated;             // Date of last weight
                    endDate = $scope.dateCreated.toJSON();
                    numWeeks = $scope.getNumDays(strtDate, endDate) / 7;                                // Number of weeks from last progress forms
                    // In the first week, there should not be any average loss yet. According to the given formula
                    if(numWeeks < 1) {                                             
                        res = 0;
                    }
                    else {
                        tmp = ( ((pat.progressForms[pat.progressForms.length-1].weight - todayWeight) * 100) / pat.progressForms[pat.progressForms.length-1].weight);
                        res = (tmp / numWeeks).toFixed(2);
                    }                                                    
                }
                // Case 2: Calling from past progress form
                else {
                    if(index === 0){
                        tmp = ( ((pat.startWeight - pat.progressForms[0].weight) * 100) / pat.startWeight);
                        strtDate = pat.dateCreated;                                                     // Date of last weight
                        endDate = pat.progressForms[index].dateCreated;                                 // Date of current weight
                        numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                    }
                    else {
                        tmp = ( ((pat.progressForms[index-1].weight - pat.progressForms[index].weight) * 100) / pat.progressForms[index-1].weight);
                        strtDate = pat.progressForms[index-1].dateCreated;                              // Date of last weight
                        endDate = pat.progressForms[index].dateCreated;                                 // Date of current weight
                        numWeeks = $scope.getNumDays(strtDate, endDate) / 7;
                    }

                    // IF a week has not passed yet
                    if(numWeeks < 1) {
                        res = 0;
                    }
                    else{
                        res = (tmp / numWeeks).toFixed(2);
                    }
                }
            }
            return res;
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


        // Purpose:     This function retrieve all the information regarding a particular food
        //              based on the food name. The retrieved information filled out on the form
        //              kcal/cup and kcal/kg if applicable
        // Parameters:  String representation of food name
        // Return:      kcal/cup
        $scope.getFoodInfo = function(foodName) {
            var i = $scope.dogFoodNames.indexOf(foodName);
            // Set scope variable if element is found
            if(i !== -1) {
                return $scope.dogFoods[i].kcalPerCup;
            }
            return undefined;  // Food is not in database
        };

        // Purpose:     This function serves as a workaround the issue of bootstrap typeahead
        //              directive not modeling the bootstrap directive
        $scope.formatLabel = function(model, pFormId) {
            console.log('Format Label, model: ' + model);
            var ans = '';
            if(model === '') {
                ans = '';
            }
            // If a number is passed, then user select a previously defined function
            else if(!isNaN(model)) {
                        ans = $scope.dogFoods[model].name;
            }
            else {
                ans = model;
            }

            // For call from past edited form and new form
            console.log('ans: ' + ans);
            if(pFormId === -1) {
                $scope.selectedFood = ans;
                $scope.foodKCalPerCup = $scope.getFoodInfo(ans);
            }
            else {
                $scope.activePatient.progressForms[pFormId].foodName = ans;
                console.log('$scope.getFoodInfo(ans): ' + $scope.getFoodInfo(ans));
                $scope.activePatient.progressForms[pFormId].foodKCalPerCup = $scope.getFoodInfo(ans);
            }
            return ans;
        };
        

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
            console.log('APt: ' + $scope.activePatient);

            $scope.activePatient = ActivePatient.getActivePatient();
            //console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));
            if(!ActivePatient.activePatientSet()) {
                $location.path('/'); 
                //setTimeout(function(){ $location.path('/overview'); }, 100);
            }
            $scope.formsLocked = $scope.formsLockedFromEditing();       // Are forms allowed to be edited?


            // Set Default next visit and next call date
            $scope.nextVisit = new Date();
            $scope.nextCall = new Date();
            var tmp = 7;
            $scope.nextCall.setDate($scope.nextCall.getDate() + tmp);   // Call 7 days from today
            tmp = 14;
            $scope.nextVisit.setDate($scope.nextVisit.getDate() + tmp); // Call 14 days from today      


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

            // Retrieve the list of foods that are in the database for food name field
            var foods = DogFoodService.query(function( getDogFoodsResponse ) {
                //console.log(getDogFoodsResponse);
                $scope.dogFoods = getDogFoodsResponse;
                for(var i = 0; i < $scope.dogFoods.length; i++) {
                    $scope.dogFoods[i].index = i;
                    $scope.dogFoodNames[i] = $scope.dogFoods[i].name;
                }

            });

            // Add index as part of the object to overcome the issue of using $index with ng-repeat
            var i;
            for(i = 0; i !== $scope.activePatient.progressForms.length; ++i) {
                // Add necessary index and necessary flag to each progress form object
                $scope.activePatient.progressForms[i].index = i;
                $scope.activePatient.progressForms[i].edit = false;
                if($scope.activePatient.progressForms[i].overrideCupsPerFeeding === undefined &&
                    $scope.activePatient.progressForms[i].vetIdOverrideCPF === undefined) {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = false;
                    $scope.activePatient.progressForms[i].feedAdjustment = false;
                }
                else {
                    $scope.activePatient.progressForms[i].feedAdjustmentFlag = true;
                    $scope.activePatient.progressForms[i].feedAdjustment = false;
                }
                $scope.activePatient.progressForms[i].foodChangedFlag = false;

                // For weight editing features in Adding new form
                $scope.activePatient.progressForms[i].weightKg = $scope.activePatient.progressForms[i].weight;
                $scope.activePatient.progressForms[i].weightLb = $scope.kgToLb($scope.activePatient.progressForms[i].weight);


                // Copy all the progress forms before user makes any modifications to them
                $scope.constProgForm[i] = new Object({
                    index:i,
                    edit: false,
                    weight:{
                        weightKg:$scope.activePatient.progressForms[i].weight,
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

        $scope.initPatient();
    }
]);

angular.module('forms').filter('phoneFormat', function($filter) {
    // Assumes number in the format of XXX-XXX-XXXX
    return function (phoneNumber) {
        if (phoneNumber === null || phoneNumber === undefined) {
            return '';
        }

        else {
            var last4 = phoneNumber.substring(6, phoneNumber.length);
            var mid3 = phoneNumber.substring(3, 6);
            var first3 = phoneNumber.substring(0, 3);
            return (first3 + '-' + mid3 + '-' + last4);
        }
    };

});