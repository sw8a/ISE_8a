'use strict';

angular.module('patients').service('ActivePatient', [
    function() {

        
        var activePatient = {
            _id: "fakeID"
        };

        return {
            setActivePatient: function(patientToSet) {
                console.log(activePatient);
                console.log(patientToSet);
                activePatient = patientToSet;
                console.log("set AP called");
                console.log(activePatient);
                return activePatient;
            },

            getActivePatient: function() {
                return activePatient;
            },

            addProgressForm: function(progressFormID) {

            }
        };

    }
]);