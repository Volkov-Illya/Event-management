/*
 * @author illya
 * Core methods for auth
 */

const UserShema = require('./../../db/schemas/User.js');
const jwt = require('jsonwebtoken');

//

const AuthCore = {

	register: async (userData) => {

		const newUser = new UserShema(userData);

		let userSaved = await newUser.save()

		if (userSaved.hashedPassword) {

			const token = jwt.sign(userSaved, app.get('jwtSecret'));

			let userData = {
				user: userSaved,
				token: token
			}

			return userData;

		}

	},

	login: async (userData) => {

		let user = await UserShema.findOne({
			email: userData.email.toLowerCase()
		});

		if (user) {

			let authentifacation = user.encryptPasword(userData.password);

			if (authentifacation) {

				const token = jwt.sign(user, app.get('jwtSecret'));

				let userData = {
					user: user,
					token: token
				}

				return userData;

			}

		}

	}

};

//

module.exports = AuthCore;