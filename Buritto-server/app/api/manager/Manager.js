const ManagerCore = require('../../core/manager/Manager.js');
const UserShema = require('./../../db/schemas/User.js');

const jwt = require('jsonwebtoken');

const User = {

	companyProfileForm: async (req, res) => {

		let {
			userId,
			firstname,
			lastname,
			middlename,
			experience,
			region,
			regionId,
			medias,
			works,
			interests,
			userpic,
			userCV
		} = req.body;

		let userData = {
			profileComplete: true,
			userId: userId,
			firstname: firstname,
			lastname: lastname,
			middlename: middlename,
			interests: interests,
			experience: experience,
			region: region,
			regionId: regionId,
			medias: medias,
			works: works,
			userpic: userpic,
			userCV: userCV
		}

		let companyProfileData = await ManagerCore.CompanyProfileForm(userData);


		if (companyProfileData) {

			return res.send(companyProfileData)

		}

		let error = util.errorHelper.unauthorised('Server error');

		return res.status(error.code).send(error)

	},

	editProfile: async (req, res) => {

		let {
			userId,
			firstName,
			lastName,
			middleName,
			experience,
			region,
			regionId,
			medias,
			works,
			interests,
			userpic,
			userCV
		} = req.body;

		let userData = {
			profileComplete: true,
			userId: userId,
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			interests: interests,
			experience: experience,
			region: region,
			regionId: regionId,
			medias: medias,
			works: works,
			userpic: userpic,
			userCV: userCV
		}

		let profileData = await ManagerCore.editProfile(userData);

		if (profileData) {

			return res.send(profileData)

		}

		let error = util.errorHelper.unauthorised('Server error');

		return res.status(error.code).send(error)

	},

}

module.exports = User;