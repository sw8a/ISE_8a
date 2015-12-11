'use strict';

angular.module('auxthera').service('ActiveAuxthera', ['AuxtheraService',
    function(AuxtheraService) {

        
        var activeAuxthera = {};
        var auxtheraNeedsUpdate = false;


        return {
            setActiveAuxthera: function(auxtheraToSet) {
                // Takes in an object and makes that the active Auxthera 
                //  ~ no checking to make sure it is a valid Auxthera
                activeAuxthera = auxtheraToSet;
                return activeAuxthera;
            },

            getActiveAuxthera: function() {
                // Returns the active auxthera unless an update has been requested at which point it will get the latest version of the current active auxthera from the database
                if(auxtheraNeedsUpdate) {
                    auxtheraNeedsUpdate = false;
                    var auxthera = new AuxtheraService({
                        _id: activeAuxthera._id
                    });
                    
                    auxthera.$get(function( updateActiveAuxtheraResponse ) {
                        activeAuxthera = updateActiveAuxtheraResponse;
                        return activeAuxthera;
                    });
                }
                else {
                    return activeAuxthera;
                }
            },

            setAuxtheraNeedsUpdate: function() {
                // Request an update the next time getActiveAuxthera is called
                auxtheraNeedsUpdate = true;
            },

            updateActiveAuxthera: function() {
                // Similar to getActiveAuxthera but will always get the latest version from the database
                var auxthera = new AuxtheraService({
                    _id: activeAuxthera._id,
                    populateForms: true
                });
                
                auxthera.$get(function( updateActiveAuxtheraResponse ) {
                    activeAuxthera = updateActiveAuxtheraResponse;
                    auxtheraNeedsUpdate = false;
                    return activeAuxthera;
                });
            },

            activeAuxtheraSet: function() {
                console.log(activeAuxthera);
                if(activeAuxthera._id === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
    }
]);
