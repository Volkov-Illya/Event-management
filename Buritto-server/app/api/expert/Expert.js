const ExpertCore = require('../../core/expert/Expert.js');
const UserShema = require('./../../db/schemas/User.js');

const jwt = require('jsonwebtoken');

const User = {

	profileForm: async (req, res) => {

		let {
			age,
			userId,
			experience,
			region,
			regionId,
			description,
			firstname,
			interests,
			lastname,
			middlename,
			works,
			userpic,
			userCV
		} = req.body;

		let userData = {
			profileComplete: true,
			userId: userId,
			firstname: firstname,
			lastname: lastname,
			middlename: middlename,
			age: age,
			interests: interests,
			experience: experience,
			region: region,
			regionId: regionId,
			description: description,
			works: works,
			userpic: userpic,
			userCV: userCV
		}

		let profileData = await ExpertCore.profileForm(userData);

		if (profileData) {
			console.log(profileData)
			return res.send(profileData)

		}

		let error = util.errorHelper.unauthorised('Server error');
		console.log(error)
		return res.status(error.code).send(error)

	},

	editProfile: async (req, res) => {

		let {
			age,
			userId,
			experience,
			region,
			regionId,
			description,
			firstName,
			interests,
			lastName,
			middleName,
			works,
			userpic,
			userCV
		} = req.body;

		let userData = {
			profileComplete: true,
			userId: userId,
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			age: age,
			interests: interests,
			experience: experience,
			region: region,
			regionId: regionId,
			description: description,
			works: works,
			userpic: userpic,
			userCV: userCV
		}

		let profileData = await ExpertCore.editProfile(userData);

		if (profileData) {

			return res.send(profileData)

		}

		let error = util.errorHelper.unauthorised('Server error');

		return res.status(error.code).send(error)

	},

	getList: async (req, res) => {

		let params = {};

		params.search = req.query.search;
		params.regionId = req.query.regionId;
		params.skip = +req.query.skip;
		params.limit = +req.query.limit;

		let expertsList = await ExpertCore.getList(params);


		if (expertsList) {

			return res.send(expertsList)

		}

		let error = util.errorHelper.badRequest('Server error');

		return res.send(error);

	}

}

module.exports = User;