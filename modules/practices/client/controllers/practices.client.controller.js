'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', 'PatientsService', 'FeedbackService', '$location', '$stateParams', '$window', 'ActivePatient',
    function($scope, Authentication, PracticesService, PatientsService, FeedbackService, $location, $stateParams, $window, ActivePatient) {

        $scope.patients = ActivePatient.getActivePractice().patients;
        $scope.practiceName = ActivePatient.getActivePractice().name;

        $scope.authentication = Authentication;
        console.log(JSON.stringify($scope.authentication, null, 4));

        // if a user is not logged in, route us back to the root
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatientsList = [];
        $scope.activePatientsFiltered = [];

        $scope.inactivePatientsList = [];
        $scope.inactivePatientsFiltered = [];

        $scope.keysToSearch = ['patientId', 'firstName', 'dateCreated'];
        $scope.petOwnerKeysToSearch = ['lastName', 'firstName', 'phoneNumber'];
        $scope.sortBy = '';

        $scope.search = '';

        $scope.changeSort = function(sortRequest) {
            if($scope.sortBy === sortRequest) {
                $scope.sortBy = '-' + sortRequest;
            }
            else if($scope.sortBy === ('-' + sortRequest)) {
                $scope.sortBy = '';
            }
            else {
                $scope.sortBy = sortRequest;
            }

            // Angular needs to update the view so the latest size is measured. This is not ideal.
            setTimeout(function(){ $('.headerTableContainer').height($('.patientListTableHead').height()); }, 20);
        };


        $scope.newPatientClick = function() {
            // Clear active patient
            ActivePatient.setActivePatient({});

            // Go to enrollment form
            $location.path('/enrollmentForm');

        };

        $scope.selectPatient = function(selectedPatient) {
            ActivePatient.setActivePatient(selectedPatient);

            // Get active patient to populate forms
            var patient = new PatientsService({
                _id: selectedPatient._id,
                populateForms: true
            });

            patient.$get(function(selectActivePatientResponse) {
                ActivePatient.setActivePatient(selectActivePatientResponse);

                // Redirect to overview
                $location.path('/overview');
            });
        };

        $scope.initPractice = function() {

            var practice;
            if($scope.authentication.user.practiceDocId !== undefined) {
                practice = new PracticesService({
                    _id: $scope.authentication.user.practiceDocId
                });
            }
            // Else should be replaced with redirect to signin for real use
            else {
                practice = new PracticesService({
                    _id: '5639a8f129e356c349ff1934'
                });
            }
            

            $scope.getPracticePromise = practice.$get(function(practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;
                $scope.practiceName = ActivePatient.getActivePractice().name;

                console.log('APc: ' + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                ActivePatient.setPatientNeedsUpdate();
                console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

                for (var i = 0; i < practiceResponse.patients.length; i++) {
                    if (practiceResponse.patients[i].exitForm === undefined) {
                        $scope.activePatientsList.push(practiceResponse.patients[i]);
                    }
                    else {
                        $scope.inactivePatientsList.push(practiceResponse.patients[i]);
                    }
                }

                $scope.activePatientsFiltered = $scope.activePatientsList;
                $scope.inactivePatientsFiltered = $scope.inactivePatientsList;

                // Initialize scroll bar
                $('.tableContainer').mCustomScrollbar({
                    scrollbarPosition: 'outside',
                    callbacks: {
                        /*
                        whileScrolling: function() {
                            if (this.mcs.topPct === 100) {
                                $('.tableContainer').removeClass('tableContainerBottomBorder');
                            } else {
                                $('.tableContainer').addClass('tableContainerBottomBorder');
                            }
                        }*/
                    }

                });

                $('.headerTableContainer').height($('.patientListTableHead').height());

                return;
            });

            /*
            // Create new practice
            var practice = new PracticesService({
                _id: '5639a8f129e356c349ff1934',
                name: 'Acme Animal Care',
                address: '123 Street Rd, Nowhere, FL 33333',
                practiceId: 'fakePracticeId'
            });

            practice.$save(function (practiceResponse) {

                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                ActivePatient.setPracticeNeedsUpdate();
                console.log("APc: " + JSON.stringify(ActivePatient.getActivePractice(), null, 4));
                
            });
            */
        };

        $scope.searchChange = function(page) {
            if(page === 'active') {
                $scope.activePatientsFiltered = $scope.activePatientsList;
                $scope.activePatientsFiltered = $scope.activePatientsFiltered.filter(searchFilter);
            }
            else if(page === 'inactive') {
                $scope.inactivePatientsFiltered = $scope.inactivePatientsList;
                $scope.inactivePatientsFiltered = $scope.inactivePatientsFiltered.filter(searchFilter);   
            }
            $('.headerTableContainer').height($('.patientListTableHead').height());
        };

        function searchFilter(item) {
            // Counld add multi word search, eg 'firstName lastName', split at space, change true returns to increment a count, if count == number of words, return true.

            var i;
            for (i = 0; i < $scope.keysToSearch.length; i++) {
                if (item.hasOwnProperty($scope.keysToSearch[i])) {
                    if (item[$scope.keysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        return true;
                    }
                }
            }

            // Search pet owner fields
            if(item.hasOwnProperty('petOwner') && item.petOwner !== null && item.petOwner !== undefined) {
                var itemPetOwner = item.petOwner;
                for(i = 0; i < $scope.petOwnerKeysToSearch.length; i++) {
                    if (itemPetOwner.hasOwnProperty($scope.petOwnerKeysToSearch[i])) {
                        if (itemPetOwner[$scope.petOwnerKeysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            }


            return false;
        }


        $scope.newFeedback = function() {

            var feedback = new FeedbackService({
                messages: [{ message: this.message }],
                patient: ActivePatient.getActivePatient()._id,
                practice: ActivePatient.getActivePractice()._id,
                company: '5650077a8038b1a6d2e24bac' // user: Admin
            });

            feedback.$save(function(feedbackResponse) {
                
            });
        };


        // Maintian table header size on window resize, binding to window extends outside of this controller
        var window = angular.element($window);
        window.bind('resize', function () {
            $('.headerTableContainer').height($('.patientListTableHead').height());
        });

    }
]);

angular.module('practices').filter('dateFormat', function($filter) {

    return function(input) {
        if (input === null) {
            return '';
        }

        return $filter('date')(new Date(input), 'dd MMM yyyy');
    };

});

angular.module('practices').filter('phoneFormat', function($filter) {
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
