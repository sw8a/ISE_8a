'use strict';
//This is the test file for protractor

// conf.js
exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['modules/core/tests/client/protractorTest.js'],
  //---- To use default browser, delete from 
  capabilities: {
    browserName: 'chrome'
  }
  //---- to here
}

