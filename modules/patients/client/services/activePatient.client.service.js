'use strict';

angular.module('patients').service('ActivePatient', ['PatientsService', 'PracticesService',
    function(PatientsService, PracticesService) {

        
        var activePatient = {};
        var needsUpdate = false;

        var activePractice = {};

        return {
            setActivePatient: function(patientToSet) {
                activePatient = patientToSet;
                return activePatient;
            },

            getActivePatient: function() {
                if(needsUpdate) {
                    var patient = new PatientsService({
                        _id: activePatient._id,
                        populateForms: true
                    });
                    
                    patient.$get(function( updateActivePatientResponse ) {
                        activePatient = updateActivePatientResponse;
                        needsUpdate = false;
                        return activePatient;
                    });
                }
                return activePatient;
            },

            setNeedsUpdate: function() {
                needsUpdate = true;
            },

            updateActivePatient: function() {
                var patient = new PatientsService({
                    _id: activePatient._id,
                    populateForms: true
                });
                
                patient.$get(function( updateActivePatientResponse ) {
                    activePatient = updateActivePatientResponse;
                    needsUpdate = false;
                    return activePatient;
                });
            },





            setActivePractice: function(practiceToSet) {
                activePractice = practiceToSet;
                return activePractice;
            },

            getActivePractice: function() {
                if(needsUpdate) {
                    var practice = new PracticesService({
                        _id: activePractice._id
                    });
                    
                    practice.$get(function( updateActivePracticeResponse ) {
                        activePractice = updateActivePracticeResponse;
                        needsUpdate = false;
                        return activePractice;
                    });
                }
                return activePractice;
            },

            updateActivePractice: function() {
                var practice = new PracticesService({
                    _id: activePractice._id
                });
                
                practice.$get(function( updateActivePracticeResponse ) {
                    activePractice = updateActivePracticeResponse;
                    needsUpdate = false;
                    return activePractice;
                });
            }
            
        };

    }
]);
