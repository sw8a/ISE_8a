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

    birthDate: {
        type: Number,
        min: 0
    },
    
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
    
    owner: {
        type: Schema.ObjectId,
        ref: 'Owner'
    },

    changedData: [ {
        dateChanged: {
            type: Date,
            default: Date.now
        }
    } ]
},
{ collection: 'patients' });


mongoose.model('Patient', PatientSchema);
