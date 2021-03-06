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

    var LastNameList = ['Doe', 'Smith', 'Santana', 'Osbourne', 'Daniels', 'Beam', 'Floyd', 'VanHalen'];
    var LastName = LastNameList[Math.floor(Math.random() * LastNameList.length)];

    var FirstNameList = ['John', 'Carlos', 'Ozzy', 'Jack', 'Jim', 'Billy', 'Johny', 'Jeff', 'Jose', 'Eddy'];
    var FirstName = FirstNameList[Math.floor(Math.random() * FirstNameList.length)];

    var dogBrandList = ['Kibbles', 'Purina', 'Pedigree', 'Generic Dog Food', 'Purina One', 'Bachelor Chow'];
    var dogBrand = dogBrandList[Math.floor(Math.random() * dogBrandList.length)];

    var email = ( FirstName + LastName + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + '@live.com');

    var PhoneNumber = ('352' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));

    var TechID = ('TechID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var VetID = ('VetID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var AuxID = ('AuxID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));

    var newPID = ('pid'  + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));

    var dogWeightEND = (dogWeight - 7);

    var dogBCSEND = 5;

  it('should log in', function() {

    //Go to the app
    browser.get('http://127.0.0.1:3000/');
    expect(browser.getTitle()).toEqual('Trimauxil | Supports weight loss in companion pets');
    browser.sleep(1000);

    //enter a username and password
    element(by.model('credentials.username')).sendKeys('username2');
    element(by.model('credentials.password')).sendKeys('password2');

    //click the sign-in button
    element(by.css('.btn')).click();

    //check the browser address
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');
    //browser.sleep(1000);
  });

  it('should add new patient', function() {

    browser.sleep(1000);

    //click add new patient
    element(by.css('.AddButton > button:nth-child(1)')).click();
    browser.sleep(1000);
    
    //Checking webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/enrollmentForm');
    browser.sleep(2000);

    //Choose lbs
    //element(by.css('label.col-md-1:nth-child(3) > input:nth-child(1)')).click();

    //Date
    //element(by.css('#date')).sendKeys('12/15/15' );

    //Create random PID
    element(by.css('#patientID')).sendKeys(newPID);

    //Pet name from the list of names
    element(by.css('#petName')).sendKeys(dogName);
    
    //Client info
    element(by.css('#clientLastName')).sendKeys(LastName);
    element(by.css('#clientFirstName')).sendKeys(FirstName);
    element(by.css('#clientTelephone')).sendKeys(PhoneNumber);
    element(by.css('#clientEmail')).sendKeys(email);
    element(by.css('#confirmEmail')).sendKeys(email);

    //Agree to emails and calls? Yes
    element(by.css('div.form-group:nth-child(4) > div:nth-child(2) > input:nth-child(1)')).click();

    //DOB and breed
    element(by.css('#dob')).sendKeys('0' + Math.floor((Math.random() * 10) + 1) + '/0' + Math.floor((Math.random() * 10) + 1) + '/200' + Math.floor((Math.random() * 8) + 1));
    element(by.css('div.form-group:nth-child(6) > div:nth-child(2) > input:nth-child(2)')).click();
    element(by.css('div.form-group:nth-child(6) > div:nth-child(3) > input:nth-child(2)')).click();
    element(by.css('#breed')).sendKeys(dogBreed);
    
    //Dog food
    element(by.css('#brand')).sendKeys(dogBrand);
    element(by.css('#kcalPerCup')).sendKeys('205');
    element(by.css('div.col-md-5:nth-child(1) > input:nth-child(2)')).sendKeys('1');
    element(by.css('#foodAmount')).sendKeys('2');

    //Treats
    element(by.css('#dailyTreats')).sendKeys(dogTreat);

    //Medical stuff
    //element(by.css('#significantMedicalHistory')).sendKeys('None');
    element(by.css('div.form-group:nth-child(17) > input:nth-child(2)')).sendKeys(dogWeight);
    element(by.css('#BCS')).sendKeys(dogBCS);

    //Good to go?
    element(by.css('#eligibleDog')).click();

    //Signatures
    element(by.css('#vetSig')).sendKeys('Jane Doe');

    element(by.css('#technician')).sendKeys(TechID);
    element(by.css('#veterinarian')).sendKeys(VetID);

    browser.sleep(2000);

    //Save
    element(by.css('button.btn:nth-child(3)')).click();
    browser.sleep(2000);

    //Check webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
  });

  it('should find the patient in the list', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(2) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(newPID);
    browser.sleep(2000);

    element(by.css('.patientTableRow > td:nth-child(1)')).click();
    browser.sleep(2000);
    //Check webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });


  it('should add a progress form, AKA visit form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    //click link to progress (visit) form
    element(by.css('.sidebar-nav > li:nth-child(4) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    
    //Checks webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

    //Open new form
    element(by.css('.panel-heading')).click();
    browser.sleep(1000);

    //Fill out the form
    element(by.css('div.col-xs-6:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 2);
    //browser.sleep(2000);
    element(by.css('input.ng-pristine:nth-child(3)')).click();
    //browser.sleep(2000);
    element(by.css('div.row:nth-child(8) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('div.row:nth-child(10) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('#comment')).sendKeys('This is a comment');
    //browser.sleep(2000);
    element(by.css('div.form-group:nth-child(4) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
    //browser.sleep(2000);
    element(by.css('div.form-group:nth-child(5) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
    browser.sleep(2000);
    element(by.css('.btn')).click();


    browser.sleep(3000);

    //Check webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });



  // it('should add a second progress form', function() {

  //   //Make sure it is still on same page
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

  //   //Click on the progress (visit) form
  //   element(by.css('.sidebar-nav > li:nth-child(4) > a:nth-child(1) > button:nth-child(1)')).click();
  //   browser.sleep(2000);
    
  //   //Check webpage
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

  //   //Open new form
  //   element(by.css('div.panel:nth-child(1) > div:nth-child(1)')).click();
  //   browser.sleep(1000);

  //   //Fill out the form
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 4);
  //   //browser.sleep(2000);
  //   element(by.css('input.ng-invalid:nth-child(3)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('div.row:nth-child(8) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('div.row:nth-child(10) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > textarea:nth-child(1)')).sendKeys('This is a comment');
  //   //browser.sleep(2000);
  //   element(by.css('div.form-group:nth-child(4) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
  //   browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
  //   browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)')).click();

  //   browser.sleep(5000);

  //   //Check webpage
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
  //   browser.sleep(2000);
  // });

  // it('should add a third progress form', function() {

  //   //Make sure it is still on same page
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

  //   //Click on the progress (visit) form
  //   element(by.css('.sidebar-nav > li:nth-child(4) > a:nth-child(1) > button:nth-child(1)')).click();
  //   browser.sleep(2000);
    
  //   //Check webpage
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

  //   //Open new form
  //   element(by.css('div.panel:nth-child(1) > div:nth-child(1)')).click();
  //   browser.sleep(1000);

  //   //Fill out the form
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 6);
  //   //browser.sleep(2000);
  //   element(by.css('input.ng-invalid:nth-child(3)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('div.row:nth-child(8) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('div.row:nth-child(10) > div:nth-child(2) > label:nth-child(2) > input:nth-child(1)')).click();
  //   //browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > textarea:nth-child(1)')).sendKeys('This is a comment');
  //   //browser.sleep(2000);
  //   element(by.css('div.form-group:nth-child(4) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
  //   //browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
  //   browser.sleep(2000);
  //   element(by.css('form.ng-invalid > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)')).click();

  //   browser.sleep(3000);

  //   //Check webpage
  //   expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
  //   browser.sleep(10000);
  // });


  it('should find the patient in the list', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(2) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(newPID);
    browser.sleep(2000);

    element(by.css('.patientTableRow > td:nth-child(1)')).click();
    browser.sleep(2000);
    //Check webpage
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });

  it('should complete an exit form', function() {

    element(by.css('.sidebar-nav > li:nth-child(7) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/exitForm');

    //choose lbs
    //element(by.css('label.col-md-1:nth-child(3) > input:nth-child(1)')).click();

    //Choose ideal weight met
    //element(by.css('div.form-group:nth-child(2) > div:nth-child(2) > label:nth-child(1) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    
    //Weight
    //var dogWeightEND = (dogWeight - 7);
    browser.sleep(2000);
    //element(by.css('div.form-group:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > input:nth-child(1)')).clear();
    element(by.css('div.form-group:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > input:nth-child(1)')).sendKeys(dogWeightEND);
    browser.sleep(1000);

    //var dogBCSEND = 5;
    element(by.css('#finalBCS')).sendKeys(dogBCSEND);
    browser.sleep(1000);

    //Brand
    element(by.css('#brand')).sendKeys(dogBrand);
    //Cups of food
    element(by.css('#foodAmount')).sendKeys('1');
    //Times per day
    element(by.css('input.col-md-3:nth-child(4)')).sendKeys('2');

    //browser.sleep(2000);

    element(by.css('div.form-group:nth-child(10) > div:nth-child(1) > label:nth-child(3) > input:nth-child(1)')).click();
    
    //Patient's name
    element(by.css('#personName')).sendKeys(FirstName + ' ' + LastName);

    element(by.css('div.form-group:nth-child(13) > div:nth-child(1) > label:nth-child(5) > input:nth-child(1)')).click();
    element(by.css('div.col-md-2:nth-child(5) > input:nth-child(1)')).click();
    element(by.css('.col-md-offset-5 > input:nth-child(1)')).click();

    element(by.css('#ownerComments')).sendKeys('Good job with the product!');
    //browser.sleep(2000);

    element(by.css('#technician')).sendKeys(TechID);
    //browser.sleep(2000);

    //element(by.css('#veterinarian')).sendKeys(VetID);
    //browser.sleep(2000);


    element(by.css('.btn')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('should no longer have user in active patien list & log out', function() {

    element(by.css('.sidebar-nav > li:nth-child(2) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(newPID);
    browser.sleep(2000);
    
    element(by.css('button.pull-right')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/signin');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('should log into the AuxThera Side', function() {


    browser.sleep(1000);

    element(by.model('credentials.username')).sendKeys('username1');
    element(by.model('credentials.password')).sendKeys('password1');

    //click the sign-in button
    element(by.css('.btn')).click();

    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/auxOverview');
    browser.sleep(1000);


    //patient call list
    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);

    //Feedback viewer
    element(by.css('.sidebar-nav > li:nth-child(4) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    
    //New updates
    element(by.css('.sidebar-nav > li:nth-child(5) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);

    //New user
    element(by.css('.sidebar-nav > li:nth-child(6) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    

   
    //log out
    element(by.css('.logOutButton > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(1000);


    //expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/signin');
    //browser.sleep(1000);
    //browser.sleep(1000);
  });

});

