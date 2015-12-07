'use strict';

describe('Protractor Test of Core', function() {

    var dogNameList = ['Alfred', 'Bones', 'Charley', 'Dingdong', 'Emily', 'Frankie', 'George', 'Henry', 'Iris', 'JackSparrow', 'Kilgore', 'Lemmywinks', 'Max', 'Nosferatu', 'Ozzy', 'Patrick', 'Quinn', 'Rex', 'Sunny', 'Tony', 'Uzi', 'Vinny', 'Walter'];
    var dogName = dogNameList[Math.floor(Math.random() * dogNameList.length)];

    var dogBreedList = ['Affenpinscher', 'Afghan Hound', 'Airedale Terrier', 'Akita', 'Alaskan Malamute', 'American Cocker Spaniel', 'American Eskimo Dog (Miniature)', 'American Eskimo Dog (Standard)', 'American Foxhound', 'American Staffordshire Terrier', 'American Water Spaniel', 'Anatolian Shepherd', 'Australian Cattle Dog', 'Australian Shepherd', 'Australian Terrier', 'Basenji', 'Basset Hound', 'Beagle', 'Bearded Collie', 'Beauceron', 'Bedlington Terrier', 'Belgian Malinois', 'Belgian Sheepdog'];
    var dogBreed = dogBreedList[Math.floor(Math.random() * dogBreedList.length)];

    var dogTreatList = ['Four large pizzas', 'A dozen doughnuts', 'Bacon', 'Tuna', 'Cookies', 'A cat', 'Doggy Biscuits', 'Cheese' ];
    var dogTreat = dogTreatList[Math.floor(Math.random() * dogTreatList.length)];

    var dogPEFindingsList = ['Nothing new to report', 'Your dog is healthy', 'Your dog is fat'];
    var dogPEFindings = dogPEFindingsList[Math.floor(Math.random() * dogPEFindingsList.length)];

    var dogWeight = Math.floor(((Math.random() * 75)) + 15);

    var dogBCS = Math.floor(((Math.random() * 4)) + 5);

    var NameList = ['John Doe', 'Jane Doe', 'Billy Bob', 'Ozzy Osbourne', 'Jack Daniels', 'Jim Beam'];
    var Name = NameList[Math.floor(Math.random() * NameList.length)];

    var LastNameList = ['Doe', 'Smith', 'Santana', 'Osbourne', 'Daniels', 'Beam', 'Floyd', 'Van Halen'];
    var LastName = LastNameList[Math.floor(Math.random() * LastNameList.length)];

    var FirstNameList = ['John', 'Carlos', 'Ozzy', 'Jack', 'Jim', 'Billy', 'Johny', 'Jeff', 'Jose', 'Eddy'];
    var FirstName = FirstNameList[Math.floor(Math.random() * FirstNameList.length)];

    var dogBrandList = ['Kibbles', 'Purina', 'Pedigree', 'Generic Dog Food', 'Purina One', 'Bachelor Chow'];
    var dogBrand = dogBrandList[Math.floor(Math.random() * dogBrandList.length)];

    var email = ( FirstName + LastName + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + '@live.com');

    var PhoneNumber = ('352' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));

    var TechID = ('TechID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var VetID = ('VetID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var AuxID = ('AuxID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));


  it('should log in', function() {

    browser.get('http://127.0.0.1:3000/');
    expect(browser.getTitle()).toEqual('Trimauxil | Supports weight loss in companion pets');
    browser.sleep(1000);

    element(by.model('credentials.username')).sendKeys('username2');
    element(by.model('credentials.password')).sendKeys('password2',
                 protractor.Key.ENTER);

    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');
    //browser.sleep(1000);
  });

  it('should add new patient', function() {

    browser.sleep(1000);

    element(by.css('.AddButton > button:nth-child(1)')).click();

    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/enrollmentForm');
    browser.sleep(2000);

    //Choose lbs
    //element(by.css('label.col-md-1:nth-child(3) > input:nth-child(1)')).click();

    //Date
    //element(by.css('#date')).sendKeys('12/06/15' );

    //Pet name from the list of names
    element(by.css('#petName')).sendKeys(dogName);

    //Create random PID
    element(by.css('#patientID')).sendKeys('pid' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) );
    
    //Client info
    element(by.css('#clientLastName')).sendKeys(LastName);
    element(by.css('#clientFirstName')).sendKeys(FirstName);
    element(by.css('#clientTelephone')).sendKeys(PhoneNumber);
    element(by.css('#clientEmail')).sendKeys(email);

    //DOB and breed
    element(by.css('#dob')).sendKeys('0' + Math.floor((Math.random() * 10) + 1) + '/0' + Math.floor((Math.random() * 10) + 1) + '/0' + Math.floor((Math.random() * 10) + 1));
    element(by.css('div.columns:nth-child(1) > label:nth-child(3) > input:nth-child(1)')).click();
    element(by.css('div.columns:nth-child(2) > label:nth-child(4) > input:nth-child(1)')).click();
    element(by.css('#breed')).sendKeys(dogBreed);
    
    //Dog food
    element(by.css('#brand')).sendKeys(dogBrand);
    element(by.css('#foodAmount')).sendKeys('1');
    element(by.css('div.form-group:nth-child(11) > div:nth-child(2) > input:nth-child(2)')).sendKeys('2');

    //Treats
    element(by.css('#dailyTreats')).sendKeys(dogTreat);

    //Medical stuff
    element(by.css('#significantMedicalHistory')).sendKeys('None');
    element(by.css('div.form-group:nth-child(18) > input:nth-child(2)')).sendKeys(dogWeight);
    element(by.css('#BCS')).sendKeys(dogBCS);

    //Good to go?
    element(by.css('label.radio-inline:nth-child(2) > input:nth-child(1)')).click();

    //Signatures
    element(by.css('#vetSig')).sendKeys('Jane Doe');

    element(by.css('#technician')).sendKeys(TechID);
    element(by.css('#veterinarian')).sendKeys(VetID);


    browser.sleep(2000);
    //Save
    element(by.css('button.btn:nth-child(3)')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
  });

  it('should add a progress form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1)')).click();
    browser.sleep(2000);
    
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');


    element(by.css('.accordion-toggle > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)')).click();
    //rowser.sleep(2000);
    element(by.css('div.col-xs-6:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 2);
    //browser.sleep(2000);
    element(by.css('input.ng-pristine:nth-child(3)')).click();
    //browser.sleep(2000);
    element(by.css('div.row:nth-child(7) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('div.row:nth-child(9) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('#comment')).sendKeys('This is a comment');
    //browser.sleep(2000);
    element(by.css('div.col-sm-5:nth-child(2) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
    //browser.sleep(2000);
    element(by.css('div.form-group:nth-child(3) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
    browser.sleep(2000);
    element(by.css('.btn')).click();


    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });

/* 

//You can only add one progress form per day...

  it('should add a second progress form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1)')).click();
    browser.sleep(20000);
    
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

    element(by.css('div.panel:nth-child(1)')).click();
    //rowser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 3);
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > input:nth-child(5)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > input:nth-child(3)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > input:nth-child(1)')).sendKeys('Jane Doe');
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > textarea:nth-child(1)')).sendKeys('This is a comment');
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
    browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)')).click();


    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });

  it('should add a third progress form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1)')).click();
    browser.sleep(2000);
    
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

    element(by.css('div.panel:nth-child(1) > div:nth-child(1) > h4:nth-child(1) > a:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)')).click();
    //rowser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 4);
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > input:nth-child(5)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > input:nth-child(3)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > input:nth-child(1)')).sendKeys('Jane Doe');
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > textarea:nth-child(1)')).sendKeys('This is a comment');
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
    //browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
    browser.sleep(2000);
    element(by.css('accordion-body.ng-scope > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)')).click();


    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });


*/


  it('should have the user in the database now', function() {

    element(by.css('.sidebar-nav > li:nth-child(7) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(dogName);
    browser.sleep(2000);
    
    element(by.css('.patientTableRow > td:nth-child(2)')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('should complete an exit form', function() {

    element(by.css('.sidebar-nav > li:nth-child(6) > a:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/exitForm');

    //choose lbs
    element(by.css('label.col-md-1:nth-child(3) > input:nth-child(1)')).click();

    //Choose ideal weight met
    element(by.css('div.form-group:nth-child(2) > div:nth-child(2) > label:nth-child(1) > input:nth-child(1)')).click();
    browser.sleep(2000);
    
    //Weight
    var dogWeightEND = (dogWeight - 5);
    element(by.css('#finalWeight')).sendKeys(dogWeightEND);
    //browser.sleep(2000);

    var dogBCSEND = 5;
    element(by.css('#finalBCS')).sendKeys(dogBCSEND);
    //browser.sleep(2000);

    //Brand
    element(by.css('#brand')).sendKeys(dogBrand);
    //Cups of food
    element(by.css('#foodAmount')).sendKeys('1');
    //Times per day
    element(by.css('input.col-xs-8:nth-child(4)')).sendKeys('2');

    //Patient's name
    element(by.css('#personName')).sendKeys(FirstName + ' ' + LastName);
    //browser.sleep(2000);

    element(by.css('div.form-group:nth-child(12) > div:nth-child(2) > label:nth-child(3) > input:nth-child(1)')).click();
    element(by.css('div.columns:nth-child(3) > label:nth-child(1) > input:nth-child(1)')).click();
    element(by.css('.col-md-offset-5 > input:nth-child(1)')).click();

    element(by.css('#ownerComments')).sendKeys('Good job with the product!');
    //browser.sleep(2000);

    element(by.css('#technician')).sendKeys(TechID);
    //browser.sleep(2000);

    element(by.css('#veterinarian')).sendKeys(VetID);
    //browser.sleep(2000);


    element(by.css('.btn')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('should no longer have user in active patien list & log out', function() {

    element(by.css('.sidebar-nav > li:nth-child(7) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(dogName);
    browser.sleep(2000);
    
    element(by.css('button.pull-right')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/signin');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

});

