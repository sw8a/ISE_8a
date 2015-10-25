'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ProgressFormSchema = new Schema({
	
	created: {
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
	
	techID: {
		type: String,
		trim: true
	},
	
	vetID: {
		type: String,
		trim: true
	},
	
	patient: {
		type: Schema.ObjectId,
		ref: 'Patient'
	}
});


mongoose.model('ProgressForm', ProgressFormSchema);

