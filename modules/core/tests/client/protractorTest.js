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

    var TechID = ('TechID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var VetID = ('VetID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));
    var AuxID = ('AuxID' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)));


  it('log in', function() {

    browser.get('http://127.0.0.1:3000/');
    expect(browser.getTitle()).toEqual('Trimauxil | Supports weight loss in companion pets');
    browser.sleep(1000);

    element(by.model('credentials.username')).sendKeys('user');
    element(by.model('credentials.password')).sendKeys('password',
                 protractor.Key.ENTER);

    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');
    //browser.sleep(1000);
  });

  it('add new patient', function() {

    browser.sleep(1000);

    element(by.css('.AddButton > button:nth-child(1)')).click();

    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/enrollmentForm');
    browser.sleep(1000);

    element(by.css('#petName')).sendKeys(dogName);
    element(by.css('#patientID')).sendKeys('pid' + Math.floor((Math.random() * 10))  + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) );
    element(by.css('#date')).sendKeys('11/20/15' );

    element(by.css('#dob')).sendKeys('0' + Math.floor((Math.random() * 10) + 1) + '/0' + Math.floor((Math.random() * 10) + 1) + '/0' + Math.floor((Math.random() * 10) + 1));
    element(by.css('label.ng-pristine:nth-child(3)')).click();
    element(by.css('div.col-md-6:nth-child(2) > label:nth-child(4)')).click();
    element(by.css('#breed')).sendKeys(dogBreed);
    
    element(by.css('#brand')).sendKeys('Dog Food' || 'Bacon Bites' || 'Pizza');
    element(by.css('#dailyTreats')).sendKeys(dogTreat);

    element(by.css('#currentMedications')).sendKeys('None' || 'Adderall' || 'Caffeine');
    element(by.css('#significantMedicalHistory')).sendKeys('None');
    element(by.css('#significantPEFindings')).sendKeys(dogPEFindings);
    element(by.css('#vetSignature')).sendKeys('Jane Doe');

    element(by.css('#currentWeight')).sendKeys(dogWeight);
    element(by.css('#BCS')).sendKeys(dogBCS);
    element(by.css('#technician')).sendKeys(TechID);
    element(by.css('#veterinarian')).sendKeys(VetID);
    element(by.css('#reviewedBy')).sendKeys(AuxID);

    browser.sleep(2000);

    element(by.css('.btn')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
  });

  it('add a progress form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1)')).click();
    browser.sleep(2000);
    
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

    element(by.css('span.ng-binding > div:nth-child(1) > div:nth-child(1)')).click();
    //rowser.sleep(2000);
    element(by.css('.col-md-7 > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)')).sendKeys(dogWeight - 2);
    //browser.sleep(2000);
    element(by.css('div.col-sm-4:nth-child(1) > input:nth-child(5)')).click();
    //browser.sleep(2000);
    element(by.css('div.form-group:nth-child(4) > div:nth-child(2) > input:nth-child(3)')).click();
    //browser.sleep(2000);
    element(by.css('.col-xs-8 > input:nth-child(1)')).sendKeys('Jane Doe');
    //browser.sleep(2000);
    element(by.css('label.radio-inline:nth-child(2) > input:nth-child(1)')).click();
    //browser.sleep(2000);
    element(by.css('#comment')).sendKeys('This is a comment');
    //browser.sleep(2000);
    element(by.css('.col-md-5 > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)')).sendKeys(TechID);
    //browser.sleep(2000);
    element(by.css('.col-md-5 > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)')).sendKeys(VetID);
    browser.sleep(2000);
    element(by.css('button.btn:nth-child(1)')).click();


    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    //browser.sleep(1000);
  });

  it('add a second progress form', function() {

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');

    element(by.css('.sidebar-nav > li:nth-child(3) > a:nth-child(1)')).click();
    browser.sleep(2000);
    
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/progressForms');

    element(by.css('div.panel:nth-child(1) > div:nth-child(1) > h4:nth-child(1) > a:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)')).click();
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

  it('add a third progress form', function() {

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

  it('user should be in database now', function() {

    element(by.css('.sidebar-nav > li:nth-child(7) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/vetHome');

    element(by.css('.form-control')).sendKeys(dogName);
    browser.sleep(2000);
    
    element(by.css('td.col-xs-2:nth-child(2)')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('complete exit form', function() {

    element(by.css('.sidebar-nav > li:nth-child(6) > a:nth-child(1) > button:nth-child(1)')).click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/exitForm');

    element(by.css('div.form-group:nth-child(2) > div:nth-child(2) > label:nth-child(1) > input:nth-child(1)')).click();
    browser.sleep(2000);
    
    element(by.css('#startWeightKG')).clear();
    element(by.css('#startWeightKG')).sendKeys(dogWeight);
    //browser.sleep(2000);

    var dogWeightEND = (dogWeight - 5);

    element(by.css('#finalWeightKG')).sendKeys(dogWeightEND);
    //browser.sleep(2000);

    element(by.css('#startBCS')).clear();
    element(by.css('#startBCS')).sendKeys(dogBCS);
    //browser.sleep(2000);

    var dogBCSEND = 5;

    element(by.css('#finalBCS')).sendKeys(dogBCSEND);
    //browser.sleep(2000);

    element(by.css('#brand')).sendKeys('Brand of Dog Food');
    //browser.sleep(2000);

    element(by.css('#personName')).sendKeys(Name);
    //browser.sleep(2000);

    element(by.css('#ownerComments')).sendKeys('Good job with the product!');
    //browser.sleep(2000);

    element(by.css('#technician')).sendKeys(TechID);
    //browser.sleep(2000);

    element(by.css('#veterinarian')).sendKeys(VetID);
    //browser.sleep(2000);

    element(by.css('#reviewedBy')).sendKeys(AuxID);
    browser.sleep(2000);

    element(by.css('.btn')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:3000/overview');
    browser.sleep(2000);
    //browser.sleep(1000);
  });

  it('user no longer in active patien list & log out', function() {

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

