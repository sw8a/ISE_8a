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

    overrideCupsPerFeeding: Number,

    vetIdOverrideCPF: {
        type: String,
        trim: true
    },
	
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
		},

        dateCreated: Date,
        
        weight: Number,
        
        trimauxilUse: {
            type: String,
            enum: ['Overuse', 'Just Right', 'Underuse']
        },
        
        weightLossAppropriate: Boolean,
        
        foodChanged: Boolean,

        overrideCupsPerFeeding: Number,

        vetIdOverrideCPF: String,
        
        comments: String,

        techId: String,
        
        vetId: String
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

    vetSig: {
        type: String,
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
		},

        dateCreated: Date,

        treats: String,

        currentMedications: String,

        medicalHistory: String,

        peFindings: String,

        vetSig: String,
        
        techId: String,
        
        vetId: String
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
        },

        dateCreated: Date,

        endingReason: String,

        finalWeight: Number,

        finalBCS: Number,
        
        techId: String,
        
        vetId: String
    } ]

},
{ collection: 'exit_forms' });



mongoose.model('ProgressForm', ProgressFormSchema);
mongoose.model('EnrollmentForm', EnrollmentFormSchema);
mongoose.model('ExitForm', ExitFormSchema);

