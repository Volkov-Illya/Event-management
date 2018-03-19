const AuthCore = require('../../core/auth/Auth.js');
const UserShema = require('./../../db/schemas/User.js');

const jwt = require('jsonwebtoken');

const User = {

	register: async (req, res) => {

		let findUser = await UserShema.findOne({
			email: req.body.email.toLowerCase()
		});

		if (findUser) {

			let error = util.errorHelper.badRequest('User email exists')

			return res.status(error.code).send(error)

		}

		let {
			accountType,
			email,
			password
		} = req.body;

		if (!email || !password || !accountType) {

			let error = util.errorHelper.badRequest('Credentials cannot be null');

			return res.status(error.code).send(error)

		}

		let userParams = {
			profileComplete: false,
			email: email,
			accountType: accountType,
			password: password
		};

		let user = await AuthCore.register(userParams);

		if (user) {

			return res.send(user)

		}

		let error = util.errorHelper.unauthorised('Unauthorised');

		return res.status(error.code).send(error)

	},

	login: async (req, res) => {

		let {
			email,
			password
		} = req.body;

		if (!email || !password) {

			let error = util.errorHelper.badRequest('Credentials cannot be null');

			return res.status(error.code).send(error)

		}

		let userParams = {

			email: email,
			password: password

		};

		let user = await AuthCore.login(userParams);

		if (user) {

			return res.send(user)

		}

		let error = util.errorHelper.unauthorised('Wrong email or password');

		return res.status(error.code).send(error)

	}

}

module.exports = User;