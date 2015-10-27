'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PatientSchema = new Schema({
    
    created: {
        type: Date,
        default: Date.now
    },
    
    name: {
        // Weight is stored in kilograms
        type: String,
        trim: true
    },
    
    patientID: {
        type: String,
        trim: true
    },

    age: {
        type: Number,
        min: 0
    }
    
    // Male = true, female = false?
    sex: Boolean,
    
    fixed: Boolean,
    
    breed: {
        type: String,
        trim: true
    }

// ENROLLMENT FORM
    treats: {
        type: String, 
        default: '',
        trim: true
    },

    currentMedications: {
        type: String, 
        default: '',
        trim: true
    },

    treats: {
        type: String, 
        default: '',
        trim: true
    },
    
    techID: {
        type: String,
        trim: true
    },
    
    vetID: {
        type: String,
        trim: true
    },
    
    owner: {
        type: Schema.ObjectId//,
        //ref: 'Owners'
    }
});


mongoose.model('Patient', PatientSchema);

