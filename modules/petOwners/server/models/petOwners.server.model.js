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

    phoneNumber: {
        type: String,
        trim: true
    },

    email: {
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

    pet: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
    
    practice: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },

    changedData: [ {
        dateChanged: {
            type: Date,
            default: Date.now
        },

        firstName: String,

        lastName: String,

        phoneNumber: String,

        email: String,

        address: String,
        
        petOwnerId: String
    } ]
},
{ collection: 'pet_owners' });


mongoose.model('PetOwner', PetOwnerSchema);