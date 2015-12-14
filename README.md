# CEN 3031 Group 8a

## We are utilizing MEAN.JS:
-------------------------

[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/meanjs/mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Master Branch:
[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)

Dev Branch:
[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=0.4.1)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean/0.4.1.svg)](https://david-dm.org/meanjs/mean/0.4.1)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Link to the deployed page
[Trimauxil WebApp deployed through Heroku](https://morning-basin-7650.herokuapp.com)

## List of all project features implemented and associated screenshots
1. Project Features Implemented
  * User authentication
    * Differing roles for users
  * Multiple forms serving various purposes (enrollment, progress, exit)
    * Make use of Bootstrap for a clean layout
    * Proper validation
    * Connected to the backend to store the form's information
  * Progress tracker page in order to easily visualize the data
    * Makes use of Chart.js and angular-chart.js to display beautiful graphs
    * Information is clearly displayed
    * Graphs use live data (pull latest data from backend)
  * MongoDB for the backend
    * Information is stored efficiently
    * Saves new changes to forms, while keeping old information for record-keeping

2. Project Screenshots
  * Login Page:

  * Vet Homepage (Active Patient List):
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Patient%20List.png)

  * Progress Tracker:
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Overview%20Page.png)

  * Enrollment Form:
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Initial%20Health%20Assessment.png)

  * Progress Form:
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Progress%20Form.png)

  * Exit Form:
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Exit%20Health%20Assessment.png)

  * Feedback Form:
  ![](https://github.com/sw8a/ISE_8a/blob/master/modules/core/client/img/demo-images/Feedback.png)

## Instructions for how to run the project locally
1. Install the [MEAN stack](https://github.com/meanjs/mean)
2. Clone our [repo](https://github.com/sw8a/ISE_8a)
3. Navigate to where you cloned the repo and run:
  * npm install
  * bower install
4. Run grunt
5. The project should now be displayed if you go to localhost:3000

## How to update database and server connections

## Credits
* Inspired by the great work of [Madhusudhan Srinivasa](https://github.com/madhums/)
* The MEAN name was coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)
* [Bootstrap](http://getbootstrap.com/)
* [AngularJS](https://angularjs.org/)
* [jQuery](https://jquery.com/)
* [AngularUI](https://angular-ui.github.io/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* [malihu custom scrollbar plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin)
* [Chart.js](http://www.chartjs.org/)
* [angular-chart.js](http://jtblin.github.io/angular-chart.js/)
* [Mongoose](https://github.com/Automattic/mongoose)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
