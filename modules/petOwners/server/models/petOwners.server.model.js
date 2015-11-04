var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PetOwnerSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },
    
    petOwnerId: {
        type: String,
        trim: true
    },

    pets: [{
        type: Schema.ObjectId,
        ref: 'Patient'
    }],
    
    practice: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },

    changedData: [ {
        dateChanged: {
            type: Date,
            default: Date.now
        }
    } ]
},
{ collection: 'pet_owners' });


mongoose.model('PetOwner', PetOwnerSchema);