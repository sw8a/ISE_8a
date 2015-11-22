'use strict';

angular.module('patients').service('ActivePatient', ['PatientsService', 'PracticesService',
    function(PatientsService, PracticesService) {

        
        var activePatient = {};
        var patientNeedsUpdate = false;

        var activePractice = {};
        var practiceNeedsUpdate = false;

        return {
            setActivePatient: function(patientToSet) {
                activePatient = patientToSet;
                return activePatient;
            },

            getActivePatient: function() {
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
                return activePatient;
            },

            setPatientNeedsUpdate: function() {
                patientNeedsUpdate = true;
            },

            updateActivePatient: function() {
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
                return activePractice;
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
