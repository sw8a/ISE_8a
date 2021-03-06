var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AuxtheraSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    feedback: [{
        type: Schema.ObjectId,
        ref: 'Feedback'
    }],

    adminTasks: {
        type: Schema.ObjectId,
        ref: 'AuxAdminTasks'
    }

},
{ collection: 'auxthera' });

var AuxAdminTasksSchema = new Schema({

    dogFoods: [{
        type: Schema.ObjectId,
        ref: 'DogFood'
    }],

    breeds: [{
        type: String,
        trim: true
    }],

    auxtheraId: {
        type: Schema.ObjectId,
        ref: 'Auxthera'
    }

},
{ collection: 'aux_admin_tasks' });


var FeedbackSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },

    message: {
        type: String,
        trim: true
    },

    read: {
        type: Boolean,
        default: false
    },

    patientId: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    
    practiceId: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },

    auxtheraId: {
        type: Schema.ObjectId,
        ref: 'Auxthera'
    }
},
{ collection: 'feedback' });





/*
Static Data databases:

Dog breeds
Dog food brands

*/

var DogBreedsSchema = new Schema({

    breeds: [{
        type: String,
        trim: true
    }]
},
{ collection: 'dog_breeds' });

var DogFoodsSchema = new Schema({

    name: {
        type: String,
        trim: true
    },

    kcalPerCup: {
        type: Number,
        min: 0
    },

    validated: Boolean
},
{ collection: 'dog_foods' });



mongoose.model('Auxthera', AuxtheraSchema);
mongoose.model('AuxAdminTasks', AuxAdminTasksSchema);
mongoose.model('Feedback', FeedbackSchema);
mongoose.model('DogBreeds', DogBreedsSchema);
mongoose.model('DogFood', DogFoodsSchema);
