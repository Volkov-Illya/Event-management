const mongoose = require('../Connection.js').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

const crypt = require('../encript/Encript.js');

//

const EventSchema = mongoose.Schema({

	eventTitle: {
		type: String
	},
	eventStart: {
		type: Date
	},
	eventFinish: {
		type: Date
	},
	tags: [],
	domains: [],

	eventLogo: {
		type: String
	},

	region: {
		type: String
	},
	regionId: {
		type: String
	},
	status: {
		type: String
	},
	description: {
		type: String
	},
	ownerId: {
		type: Number
	},
	__v: {
		type: Number,
		select: false
	}
});

// 

autoIncrement.initialize(MongoDB.connection);
EventSchema.plugin(autoIncrement.plugin, {
	model: 'Event',
	field: 'eventId'
});

// 

module.exports = mongoose.model('Event', EventSchema);