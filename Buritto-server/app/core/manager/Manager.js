/*
 * @author illya
 * Core methods for manager
 */

const UserShema = require('./../../db/schemas/User.js');
const jwt = require('jsonwebtoken');

//

const ManagerCore = {

	CompanyProfileForm: async (userData) => {

		let user = await UserShema.findOneAndUpdate({
			userId: userData.userId
		}, userData, {
			new: true
		})

		if (!user) {

			let error = util.errorHelper.badRequest(`User with id ${userData.userId} not found`)

			return error;

		}

		return user;

	},

	editProfile: async (userData) => {

		let user = await UserShema.findOneAndUpdate({
			userId: userData.userId
		}, userData, {
			new: true
		})

		if (!user) {

			let error = util.errorHelper.badRequest(`User with id ${userData.userId} not found`)

			return error;

		}

		return user;

	},

};

//

module.exports = ManagerCore;