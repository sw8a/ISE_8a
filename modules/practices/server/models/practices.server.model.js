var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PracticeSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    name: {
        type: String,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },
    
    practiceId: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    patients: [{
        type: Schema.ObjectId,
        ref: 'Patient'
    }],
    
    petOwners: [{
        type: Schema.ObjectId,
        ref: 'PetOwner'
    }],

    feedback: [{
        type: Schema.ObjectId,
        ref: 'Feedback'
    }],

    auxthera: {
        type: Schema.ObjectId,
        ref: 'Auxthera'
    },

    changedData: [{
        dateChanged: {
            type: Date,
            default: Date.now
        }
    }]
},
{ collection: 'practices' });


mongoose.model('Practice', PracticeSchema);