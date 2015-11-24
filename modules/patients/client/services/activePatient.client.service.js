'use strict';

angular.module('patients').service('ActivePatient', ['PatientsService', 'PracticesService',
    function(PatientsService, PracticesService) {

        
        var activePatient = {};
        var patientNeedsUpdate = false;

        var activePractice = {};
        var practiceNeedsUpdate = false;

        return {
            setActivePatient: function(patientToSet) {
                // Takes in an object and makes that the active patient 
                //  ~ no checking to make sure it is a valid patient
                activePatient = patientToSet;
                return activePatient;
            },

            getActivePatient: function() {
                // Returns the active patient unless an update has been requested at which point it will get the latest version of the current active patient from the database
                if(patientNeedsUpdate) {
                    patientNeedsUpdate = false;
                    var patient = new PatientsService({
                        _id: activePatient._id,
                        populateForms: true
                    });
                    
                    patient.$get(function( updateActivePatientResponse ) {
                        activePatient = updateActivePatientResponse;
                        return activePatient;
                    });
                }
                else {
                    return activePatient;
                }
            },

            setPatientNeedsUpdate: function() {
                // Request an update the next time getActivePatient is called
                patientNeedsUpdate = true;
            },

            updateActivePatient: function() {
                // Similar to getActivePatient but will always get the latest version from the database
                var patient = new PatientsService({
                    _id: activePatient._id,
                    populateForms: true
                });
                
                patient.$get(function( updateActivePatientResponse ) {
                    activePatient = updateActivePatientResponse;
                    patientNeedsUpdate = false;
                    console.log('update done: ' + activePatient.firstName);
                    return activePatient;
                });
            },



            setActivePractice: function(practiceToSet) {
                activePractice = practiceToSet;
                return activePractice;
            },

            getActivePractice: function() {
                if(practiceNeedsUpdate) {
                    var practice = new PracticesService({
                        _id: activePractice._id
                    });
                    
                    practice.$get(function( updateActivePracticeResponse ) {
                        activePractice = updateActivePracticeResponse;
                        practiceNeedsUpdate = false;
                        return activePractice;
                    });
                }
                else {
                    return activePractice;
                }
            },

            setPracticeNeedsUpdate: function() {
                practiceNeedsUpdate = true;
            },

            updateActivePractice: function() {
                var practice = new PracticesService({
                    _id: activePractice._id
                });
                
                practice.$get(function( updateActivePracticeResponse ) {
                    activePractice = updateActivePracticeResponse;
                    practiceNeedsUpdate = false;
                    return activePractice;
                });
            }
            
        };

    }
]);
