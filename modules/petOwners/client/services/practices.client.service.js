'use strict';


angular.module('petOwners').factory('PetOwnersService', ['$resource',
    function ($resource) {
        return $resource('/api/petOwners/:petOwnerId', {
            petOwnerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);