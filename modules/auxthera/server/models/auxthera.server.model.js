var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var feedbackSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    important: {
        type: Boolean,
        default: false
    },

    viewed: {
        type: Boolean,
        default: false
    },

    dateViewed: Date,

    content: {
        type: String,
        trim: true
    },

    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    
    practice: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },
},
{ collection: 'feedback' });


mongoose.model('Feedback', feedbackSchema);