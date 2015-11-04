'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ProgressFormSchema = new Schema({

    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },
	
	dateCreated: {
		type: Date,
		default: Date.now
	},
	
	weight: {
		// Weight is stored in kilograms
		type: Number,
		min: 0
	},
	
	trimauxilUse: {
		type: String,
		enum: ['Overuse', 'Just Right', 'Underuse']
	},
	
	weightLossAppropriate: Boolean,
	
	foodChanged: Boolean,
	
	comments: {
		type: String, 
		default: '',
		trim: true
	},
	
	techId: {
		type: String,
		trim: true
	},
	
	vetId: {
		type: String,
		trim: true
	},

	changedData: [ {
		dateChanged: {
			type: Date,
			default: Date.now
		}
	} ]
},
{ collection: 'progress_forms' });



var EnrollmentFormSchema = new Schema({

    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

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

    medicalHistory: {
        type: String, 
        default: '',
        trim: true
    },

    peFindings: {
        type: String, 
        default: '',
        trim: true
    },
    
    techId: {
        type: String,
        trim: true
    },
    
    vetId: {
        type: String,
        trim: true
    },

	changedData: [ {
		dateChanged: {
			type: Date,
			default: Date.now
		}
	} ]

},
{ collection: 'enrollment_forms' });



var ExitFormSchema = new Schema({

    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

    endingReason: {
        type: String, 
        trim: true
    },

    finalWeight: {
        type: Number,
        min: 0
    },

    finalBCS: {
        type: Number,
        min: 0
    },
    
    techId: {
        type: String,
        trim: true
    },
    
    vetId: {
        type: String,
        trim: true
    },

    changedData: [ {
        dateChanged: {
            type: Date,
            default: Date.now
        }
    } ]

},
{ collection: 'exit_forms' });



mongoose.model('ProgressForm', ProgressFormSchema);
mongoose.model('EnrollmentForm', EnrollmentFormSchema);
mongoose.model('ExitForm', ExitFormSchema);

