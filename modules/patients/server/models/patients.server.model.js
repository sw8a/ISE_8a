'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PatientSchema = new Schema({
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    firstName: {
        type: String,
        trim: true
    },
    
    patientId: {
        type: String,
        trim: true
    },

    birthDate: Date,
    
    sex: {
        type: String,
        enum: ['M', 'F']
    },
    
    fixed: Boolean,
    
    breed: {
        type: String,
        trim: true
    },

    startWeight: {
        type: Number,
        min: 0
    },

    bcs: {
        type: Number,
        min: 1,
        max: 9
    },

    food: {
        type: Schema.ObjectId,
        ref: 'DogFood'
    },

    enrollmentForm: {
        type: Schema.ObjectId,
        ref: 'EnrollmentForm'
    },

    progressForms: [{
        type: Schema.ObjectId,
        ref: 'ProgressForm'
    }],

    exitForm: {
        type: Schema.ObjectId,
        ref: 'ExitForm'
    },

    practice: {
        type: Schema.ObjectId,
        ref: 'Practice'
    },
    
    petOwner: {
        type: Schema.ObjectId,
        ref: 'PetOwner'
    },

    changedData: [ {
        dateChanged: {
            type: Date,
            default: Date.now
        },

        dateCreated: Date,
        
        firstName: String,
        
        patientId: String,

        birthDate: Date,
        
        sex: {
            type: String,
            enum: ['M', 'F']
        },
        
        fixed: Boolean,
        
        breed: String,

        startWeight: Number,

        bcs: Number,

        food: {
            type: Schema.ObjectId,
            ref: 'DogFood'
        }
    } ]
},
{ collection: 'patients' });


mongoose.model('Patient', PatientSchema);
