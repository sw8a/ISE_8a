'use strict';

angular.module('auxthera').service('dogBreedsService', ['DogBreedsService',
    function(DogBreedsService) {

        var dogBreeds = [];

        return {

            getDogBreeds: function() {

                if(dogBreeds !== []) {
                    return dogBreeds;
                }
                else {
                    var breeds = new DogBreedsService();

                    console.log('in dogBreeds serv');
                    console.log(breeds);
                    
                    breeds.$get(function( getDogBreedsResponse ) {
                        console.log(getDogBreedsResponse);
                        dogBreeds = getDogBreedsResponse.breeds;
                        return dogBreeds;
                    });
                }

            },

            loadDogBreeds: function() {

                var breeds = new DogBreedsService();

                console.log('in dogBreeds serv');
                console.log(breeds);
                
                breeds.$get(function( getDogBreedsResponse ) {
                    console.log(getDogBreedsResponse);
                    dogBreeds = getDogBreedsResponse.breeds;
                    return dogBreeds;
                });

            }
        };
    }
]);
