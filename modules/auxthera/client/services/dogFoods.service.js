'use strict';

angular.module('auxthera').service('dogFoodsService', ['DogFoodService',
    function(DogFoodService) {

        var dogFoods = [];

        return {

            getDogFoods: function() {

                if(dogFoods !== []) {
                    return dogFoods;
                }

                else {
                    var foods = new DogFoodService();

                    console.log('in dogFoods serv');
                    console.log(foods);
                    
                    foods.$get(function( getDogFoodsResponse ) {
                        console.log(getDogFoodsResponse);
                        dogFoods = getDogFoodsResponse;
                        return dogFoods;
                    });
                }
                  
            },

            loadDogFoods: function() {

                var foods = new DogFoodService();
                
                foods.$get(function( getDogFoodsResponse ) {
                    console.log(getDogFoodsResponse);
                    dogFoods = getDogFoodsResponse;
                    return dogFoods;
                });

            }
        };
    }
]);
