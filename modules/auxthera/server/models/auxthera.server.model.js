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
    }]

},
{ collection: 'auxthera' });


var FeedbackSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    important: {
        type: Boolean,
        default: false
    },

    //dateViewed: Date,

    messages: [{
        message: {
            type: String,
            trim: true
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        }
    }],

    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    
    practice: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },

    company: {
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
{ collection: 'dogBreeds' });





mongoose.model('DogBreeds', DogBreedsSchema);
mongoose.model('Feedback', FeedbackSchema);
mongoose.model('Auxthera', AuxtheraSchema);
