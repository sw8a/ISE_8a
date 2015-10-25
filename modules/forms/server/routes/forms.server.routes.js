'use strict';

var forms = require('..//controllers/forms.server.controller');

module.exports = function(app) {
    app.route('/forms').post(forms.create);
};
