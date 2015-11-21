'use strict';

angular.module('practices').controller('practicesController', ['$scope', 'Authentication', 'PracticesService', 'PatientsService', '$location', '$stateParams', 'ActivePatient',
    function ($scope, Authentication, PracticesService, PatientsService, $location, $stateParams, ActivePatient) {

        $scope.patients = ActivePatient.getActivePractice().patients;
        $scope.authentication = Authentication;

        //console.log($scope.authentication.user );
        // if a user is not logged in, route us back to the root
        if (!$scope.authentication.user) 
        {
            $location.path('/');
        }
        
        if (!$scope.authentication.user) {
            $location.path('/');
        }

        $scope.activePatientsList = [];
        $scope.activePatientsFiltered = [];
        $scope.keysToSearch = ['patientId', 'firstName'];

        $scope.search = '';


        $scope.newPatientClick = function () {
            // Clear active patient
            ActivePatient.setActivePatient({});

            // Go to enrollment form
            $location.path('/enrollmentForm');

        };

        $scope.selectPatient = function (selectedPatient) {
            // Get active patient to populate forms
            var patient = new PatientsService({
                _id: selectedPatient._id,
                populateForms: true
            });
            
            patient.$get(function( selectActivePatientResponse ) {
                ActivePatient.setActivePatient(selectActivePatientResponse);

                // Redirect to overview
                $location.path('/overview');
            });
        };


        $scope.getPractice = function () {

            var practice = new PracticesService({
                _id: '5639a8f129e356c349ff1934'
            });

            $scope.getPracticePromise = practice.$get(function (practiceResponse) {
                
                ActivePatient.setActivePractice(practiceResponse);

                $scope.patients = practiceResponse.patients;

                console.log('APc: ' + JSON.stringify(ActivePatient.getActivePractice(), null, 4));

                ActivePatient.setPatientNeedsUpdate();
                console.log('APt: ' + JSON.stringify(ActivePatient.getActivePatient(), null, 4));

                for(var i = 0; i < practiceResponse.patients.length; i++) {
                    if(practiceResponse.patients[i].exitForm === undefined) {
                        $scope.activePatientsList.push(practiceResponse.patients[i]);
                    }
                }

                $scope.activePatientsFiltered = $scope.activePatientsList;

                $('.tableContainer').mCustomScrollbar({scrollbarPosition: 'outside',
                    callbacks:{
                        //alwaysTriggerOffsets: true,
                        /*onTotalScroll:function(){
                            $('.tableContainer').removeClass('tableContainerBottomBorder');
                            console.log('at end');
                        },
                        onScrollStart:function(){
                            $('.tableContainer').addClass('tableContainerBottomBorder');
                            console.log('movin');
                        },*/
                        whileScrolling:function(){
                            if(this.mcs.topPct === 100) {
                                $('.tableContainer').removeClass('tableContainerBottomBorder');
                            }
                            else {
                                $('.tableContainer').addClass('tableContainerBottomBorder');
                            }
                        }
                    }

                });

                return;
            });

            /*
            // Create new practice
            var practice = new PracticesService({
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

        $scope.searchChange = function() {
            $scope.activePatientsFiltered = $scope.activePatientsList;
            $scope.activePatientsFiltered = $scope.activePatientsFiltered.filter(searchFilter);
        };

        function searchFilter(item) {
            for (var i = 0; i < $scope.keysToSearch.length; i++) {
                if (item.hasOwnProperty($scope.keysToSearch[i])) {
                    if(item[$scope.keysToSearch[i]].toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        return true;
                    }
                }
            }

            return false;
        }
    }
]);

angular.module('practices').filter('dateFormat', function($filter) {

    return function(input) {
        if(input === null) {
            return '';
        }

        return $filter('date')(new Date(input), 'dd MMM yyyy');
    };

});
