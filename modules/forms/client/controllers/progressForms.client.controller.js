'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', '$location', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
    function($scope, $location, Authentication, ProgressFormsService, ActivePatient, PatientsService) {

        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.currPatient = ActivePatient.getActivePatient();
        $scope.oneAtTime = true; // To allow one form to open at a time
        $scope.disableField = true; // Disable field if not in 'Editing' State            
        $scope.todayWeight = 0; // To be used for 2-way data binding when adding new form

        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.initPatient = function() {
            $scope.activePatient = ActivePatient.getActivePatient();
        };

        // Create new progress form
        $scope.createProgressForm = function() {
            // Create new ProgressForm object

            var progressForm = new ProgressFormsService({
                weight: this.weight,
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




        // Static Data to display until Database is fully populated. 
        $scope.clients = [{
            petName: 'Puddle',
            clientName: 'John Doe',
            phone: '(000) 000-0000',
            contactTime: '12:00AM',
            petInitWeight: '3 lbs',
            petIdealWeight: '2 lbs'
        }];

        // Compute the weight loss for that day
        $scope.getTodayWeightLoss = function(todayWeight) {
            var pat = ActivePatient.getActivePatient();
            if (pat.progressForms.length === 0) {
                return pat.startWeight - todayWeight;
            } else {
                return (pat.startWeight - pat.progressForms[pat.progressForms.length - 1].weight) / pat.startWeight;
            }
        };

        // Compute the average weight loss
        $scope.getAvgWeightLoss = function(tWeight) {
            var pat = ActivePatient.getActivePatient();
            if (pat.progressForms.length === 0) {
                return 0;
            } else {
                // (Today's weight - init weight) / init
                return (pat.startWeight - pat.progressForms[pat.progressForms.length - 1].weight) / pat.progressForms.length;
            }
        };

        // Editing form's input
        $scope.editForm = function() {
            $scope.disableField = false;
        };

        // Cancel editing on forms
        $scope.cancelEditing = function() {
            $scope.disableField = true;
        };
    }
]);