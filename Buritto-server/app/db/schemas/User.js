const mongoose = require('../Connection.js').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

const crypt = require('../encript/Encript.js');

//

const UserSchema = mongoose.Schema({
	profileComplete: {
		type: Boolean
	},
	accountType: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},

	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	middlename: {
		type: String
	},
	age: {
		type: String,
	},
	interests: {
		type: String,
	},
	experience: {
		type: String
	},
	region: {
		type: String
	},
	regionId: {
		type: String
	},

	description: {
		type: String
	},

	medias: [],
	works: [],

	userCV: {
		type: String
	},
	userpic: {
		type: String
	},

	salt: {
		type: String
	},
	hashedPassword: {
		type: String,
	},

	__v: {
		type: Number,
		select: false
	}
}, {
	toObject: {
		virtuals: true
	}
});

UserSchema.virtual('events', {
	ref: 'Event',
	localField: 'userId',
	foreignField: 'ownerId',
	justOne: false
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('password')
	.set(function (password) {

		this._plainPasword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = crypt.encrypt(password, this.salt);

	})
	.get(function () {

		return this._plainPasword

	});


UserSchema.methods.encryptPasword = function (password) {

	return this.hashedPassword === crypt.encrypt(password, this.salt);

};


UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {

		delete ret.hashedPassword;
		return ret;

	}
});


// 

autoIncrement.initialize(MongoDB.connection);
UserSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'userId'
});

// 

module.exports = mongoose.model('User', UserSchema);