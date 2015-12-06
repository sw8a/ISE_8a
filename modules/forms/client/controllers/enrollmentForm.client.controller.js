'use strict';

angular.module('forms').controller('enrollmentFormController', ['$scope', 'Authentication', '$location', '$stateParams', 'EnrollmentFormsService', 'PatientsService', 'PracticesService', 'PetOwnersService', 'ActivePatient',
    function($scope, Authentication, $location, $stateParams, EnrollmentFormsService, PatientsService, PracticesService, PetOwnersService, ActivePatient) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        console.log($scope.authentication);
        if (!$scope.authentication.user) {
            $location.path('/');
            console.log($scope.authentication);
        }

        $scope.activePatient = ActivePatient.getActivePatient();

        $scope.practiceInfo = {
            preferredUnit: 'kg'
        };

        $scope.dateCreated = new Date($scope.activePatient.enrollmentForm.dateCreated);
        $scope.firstName = $scope.activePatient.firstName;
        $scope.patientId = $scope.activePatient.patientId;

        $scope.clientLastName = $scope.activePatient.petOwner.lastName;
        $scope.clientFirstName = $scope.activePatient.petOwner.firstName;
        $scope.clientTelephone = $scope.activePatient.petOwner.phoneNumber;
        $scope.clientEmail = $scope.activePatient.petOwner.email;

        $scope.birthDate = new Date($scope.activePatient.birthDate);
        $scope.startWeight = $scope.activePatient.startWeight;
        $scope.sex = $scope.activePatient.sex;
        $scope.fixed = $scope.activePatient.fixed;
        $scope.breed = $scope.activePatient.breed;
        $scope.bcs = $scope.activePatient.bcs;

        $scope.treats = $scope.activePatient.enrollmentForm.treats;
        $scope.currentMedications = $scope.activePatient.enrollmentForm.currentMedications;
        $scope.medicalHistory = $scope.activePatient.enrollmentForm.medicalHistory;
        $scope.peFindings = $scope.activePatient.enrollmentForm.peFindings;
        $scope.vetSig = $scope.activePatient.enrollmentForm.vetSig;
        $scope.techId = $scope.activePatient.enrollmentForm.techId;
        $scope.vetId = $scope.activePatient.enrollmentForm.vetId;

        console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

        if($scope.firstName) {
            $scope.disableInput = true;
            $scope.vetApproval = true;
        }
        else {
            $scope.disableInput = false;
        }

        console.log('birthDate: ' + $scope.birthDate);

        $scope.editForm = function() {
            $scope.disableInput = false;
            $scope.editActive = true;
            $scope.vetApproval = true;
        };
        $scope.cancelEdit = function() {
            $scope.disableInput = true;
            $scope.editActive = false;
        };

        $scope.saveEdit = function() {
            var changedDataPatient = {
                _id: $scope.activePatient._id
            };
            var oldDataPatient = {};
            var patientChanged = false;

            var changedDataForm = {
                _id: $scope.activePatient.enrollmentForm._id
            };
            var oldDataForm = {};
            var formChanged = false;

            var changedDataOwner = {
                _id: $scope.activePatient.petOwner._id
            };
            var oldDataOwner = {};
            var ownerChanged = false;


            /*if(new Date($scope.dateCreated) != new Date($scope.activePatient.enrollmentForm.dateCreated)) {
                changedDataForm.dateCreated = new Date($scope.dateCreated);
                oldDataForm.dateCreated = new Date($scope.activePatient.enrollmentForm.dateCreated);
                formChanged = true;
            }*/
            if($scope.patientId !== $scope.activePatient.patientId) {
                changedDataPatient.patientId = $scope.patientId;
                oldDataPatient.patientId = $scope.activePatient.patientId;
                patientChanged = true;
            }
            if($scope.firstName !== $scope.activePatient.firstName) {
                changedDataPatient.firstName = $scope.firstName;
                oldDataPatient.firstName = $scope.activePatient.firstName;
                patientChanged = true;
            }

            if($scope.clientLastName !== $scope.activePatient.petOwner.lastName) {
                changedDataOwner.lastName = $scope.clientLastName;
                oldDataOwner.lastName = $scope.activePatient.petOwner.lastName;
                ownerChanged = true;
            }
            if($scope.clientLastName !== $scope.activePatient.petOwner.lastName) {
                changedDataOwner.lastName = $scope.clientLastName;
                oldDataOwner.lastName = $scope.activePatient.petOwner.lastName;
                ownerChanged = true;
            }
            if($scope.clientFirstName !== $scope.activePatient.petOwner.firstName) {
                changedDataOwner.firstName = $scope.clientFirstName;
                oldDataOwner.firstName = $scope.activePatient.petOwner.firstName;
                ownerChanged = true;
            }
            if($scope.clientTelephone !== $scope.activePatient.petOwner.phoneNumber) {
                changedDataOwner.phoneNumber = $scope.clientTelephone;
                oldDataOwner.phoneNumber = $scope.activePatient.petOwner.phoneNumber;
                ownerChanged = true;
            }
            if($scope.clientEmail !== $scope.activePatient.petOwner.email) {
                changedDataOwner.email = $scope.clientEmail;
                oldDataOwner.email = $scope.activePatient.petOwner.email;
                ownerChanged = true;
            }

            /*if(new Date($scope.birthDate) != new Date($scope.activePatient.birthDate)) {
                changedDataPatient.birthDate = new Date($scope.birthDate);
                oldDataPatient.birthDate = new Date($scope.activePatient.birthDate);
                patientChanged = true;
            }*/
            if($scope.startWeight !== $scope.activePatient.startWeight) {
                changedDataPatient.startWeight = $scope.startWeight;
                oldDataPatient.startWeight = $scope.activePatient.startWeight;
                patientChanged = true;
            }
            if($scope.sex !== $scope.activePatient.sex) {
                changedDataPatient.sex = $scope.sex;
                oldDataPatient.sex = $scope.activePatient.sex;
                patientChanged = true;
            }
            if($scope.fixed !== $scope.activePatient.fixed) {
                changedDataPatient.fixed = $scope.fixed;
                oldDataPatient.fixed = $scope.activePatient.fixed;
                patientChanged = true;
            }
            if($scope.breed !== $scope.activePatient.breed) {
                changedDataPatient.breed = $scope.breed;
                oldDataPatient.breed = $scope.activePatient.breed;
                patientChanged = true;
            }
            if($scope.bcs !== $scope.activePatient.bcs) {
                changedDataPatient.bcs = $scope.bcs;
                oldDataPatient.bcs = $scope.activePatient.bcs;
                patientChanged = true;
            }

            if($scope.treats !== $scope.activePatient.enrollmentForm.treats) {
                changedDataForm.treats = $scope.treats;
                oldDataForm.treats = $scope.activePatient.enrollmentForm.treats;
                formChanged = true;
            }
            if($scope.currentMedications !== $scope.activePatient.enrollmentForm.currentMedications) {
                changedDataForm.currentMedications = $scope.currentMedications;
                oldDataForm.currentMedications = $scope.activePatient.enrollmentForm.currentMedications;
                formChanged = true;
            }
            if($scope.medicalHistory !== $scope.activePatient.enrollmentForm.medicalHistory) {
                changedDataForm.medicalHistory = $scope.medicalHistory;
                oldDataForm.medicalHistory = $scope.activePatient.enrollmentForm.medicalHistory;
                formChanged = true;
            }
            if($scope.peFindings !== $scope.activePatient.enrollmentForm.peFindings) {
                changedDataForm.peFindings = $scope.peFindings;
                oldDataForm.peFindings = $scope.activePatient.enrollmentForm.peFindings;
                formChanged = true;
            }
            if($scope.vetSig !== $scope.activePatient.enrollmentForm.vetSig) {
                changedDataForm.vetSig = $scope.vetSig;
                oldDataForm.vetSig = $scope.activePatient.enrollmentForm.vetSig;
                formChanged = true;
            }
            if($scope.techId !== $scope.activePatient.enrollmentForm.techId) {
                changedDataForm.techId = $scope.techId;
                oldDataForm.techId = $scope.activePatient.enrollmentForm.techId;
                formChanged = true;
            }
            if($scope.vetId !== $scope.activePatient.enrollmentForm.vetId) {
                changedDataForm.vetId = $scope.vetId;
                oldDataForm.vetId = $scope.activePatient.enrollmentForm.vetId;
                formChanged = true;
            }

            if(patientChanged) {
                changedDataPatient.changedData = oldDataPatient;
                var patient = new PatientsService(changedDataPatient);
                console.log('patient edit:');
                console.log(patient);
                console.log(changedDataPatient);
                patient.$update(function(patientUpdateResponse) {});
            }
            if(formChanged) {
                changedDataForm.changedData = oldDataForm;
                var enrollmentForm = new EnrollmentFormsService(changedDataForm);
                console.log('enrollmentForm edit:');
                console.log(enrollmentForm);
                console.log(changedDataForm);
                enrollmentForm.$update(function(enrollmentFormUpdateResponse) {});
            }
            if(ownerChanged) {
                changedDataOwner.changedData = oldDataOwner;
                var petOwner = new PetOwnersService(changedDataOwner);
                console.log('petOwner edit:');
                console.log(petOwner);
                console.log(changedDataOwner);
                petOwner.$update(function(petOwnerUpdateResponse) {});
            }

            ActivePatient.setPatientNeedsUpdate();
        };

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

            var petOwner = new PetOwnersService({
                firstName: $scope.clientFirstName,
                lastName: $scope.clientLastName,
                phoneNumber: $scope.clientTelephone,
                email: $scope.clientEmail,
                practice: ActivePatient.getActivePractice()._id
            });

            var enrollmentForm = new EnrollmentFormsService({
                dateCreated: $scope.dateCreated,
                treats: this.treats,
                currentMedications: this.currentMedications,
                medicalHistory: this.medicalHistory,
                peFindings: this.peFindings,
                vetSig: this.vetSig,
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

                enrollmentForm.patient = patientResponse._id;
                petOwner.pet = patientResponse._id;

                petOwner.$save(function(petOwnerResponse) {
                    enrollmentForm.$save(function(enrollmentFormResponse) {
                        // executed after save
                        //patientResponse.enrollmentForm = enrollmentFormResponse._id;
                        //patientResponse.formSave = true;
                        patient = new PatientsService({
                            _id: patientResponse._id,
                            enrollmentForm: enrollmentFormResponse._id,
                            petOwner: petOwnerResponse._id,
                            formSave: true
                        });

                        patient.$update(function(patientAddFormResponse) {
                            var patient = new PatientsService({
                                _id: patientAddFormResponse._id
                            });
                            /*
                            $scope.getPatientPromise = patient.$get(function(patientResponse) {
                                ActivePatient.setActivePatient(patientResponse);
                            });*/
                            ActivePatient.updateActivePatient();

                            // Wait until the active patient has been updated. Current setup is not ideal
                            setTimeout(function(){ 
                                if(ActivePatient.getActivePatient().firstName) {
                                    $location.path('/overview'); 
                                }
                                else {
                                    setTimeout(function(){ $location.path('/overview'); }, 100);
                                }
                            }, 100);
                            
                        });
                    });
                });
            });
        };

        // Do they want some prepopulated values?
        $scope.patientInfo = {
            DOB: new Date(2013, 9, 22)
        };

        $scope.patientInfo.age = function () {
            if($scope.birthDate !== undefined) {
                var DOB = $scope.birthDate; //$scope.activePatient.birthDate
                var age = $scope.yearDifference({year: DOB.getFullYear(), month: DOB.getMonth() + 1, day: DOB.getDate()});
                return age;
            }
            else {
                return '';
            }
        };

        $scope.patientInfo.idealWeight = function () {
            var currWeight;
            var bodyFat;
            var idealWeight;
            
            if($scope.disableInput) {
                currWeight = $scope.activePatient.startWeight;
                bodyFat = $scope.activePatient.bcs * 5; // Assumes each BCS equals 5% body fat
                idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

                if($scope.practiceInfo.preferredUnit === 'kg') {
                  return idealWeight.toFixed(2);
                }
                else {
                  return (idealWeight * 2.20462).toFixed(2);
                }
            }
            else {
                currWeight = $scope.startWeight;
                bodyFat = $scope.bcs * 5; // Assumes each BCS equals 5% body fat
                idealWeight = currWeight * (100 - bodyFat) / 100 / 0.8;

                if($scope.practiceInfo.preferredUnit === 'kg') {
                    return idealWeight.toFixed(2);
                }
                else {
                    return (idealWeight * 2.20462).toFixed(2);
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
