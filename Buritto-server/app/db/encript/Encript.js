const crypto = require('crypto');

const Crypto = {
	encrypt: function (password, salt) {

		var check = password;

		return crypto.createHmac('sha256', salt)
			.update(check)
			.digest('hex');
	}

};

module.exports = Crypto;