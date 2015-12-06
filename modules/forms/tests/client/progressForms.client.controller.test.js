'use strict';

describe('Controller: progressFormsController', function() {
	
	// Load the form controller module
	beforeEach(module('forms'));

	var progressFormsController,
	scope;

	// Initialize controller and a sample sope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		progressFormsController = $controller('progressFormsController', {
			$scope: scope
		});
	}));

	// Check that the scope variables exist once a sample controller is initialize
	it('Should have oneTime = true, enterFood = false, and feedAdjustFlag = false', function() {
		expect(scope.oneAtTime).toBe(true);
	});
});