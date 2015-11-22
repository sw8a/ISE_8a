var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


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


mongoose.model('Feedback', FeedbackSchema);