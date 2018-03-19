/*
 * @author illya
 * Core methods for expert
 */

const UserShema = require('./../../db/schemas/User.js');
const jwt = require('jsonwebtoken');

//

const ExpertCore = {

	profileForm: async (userData) => {

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

	getList: async (params) => {

		let searchParams = {};
		let regionParams = {};
		let search = params.search;
		let regionId = params.regionId;

		if (search !== false && search !== '' && search !== undefined) {

			searchParams['$or'] = [];

			searchParams['$or'].push({
				"firstname": new RegExp(search, 'i')
			});

			searchParams['$or'].push({
				"medias": {
					$in: [new RegExp(search, 'i')]
				}
			});

			searchParams['$or'].push({
				"works": {
					$in: [new RegExp(search, 'i')]
				}
			});

			searchParams['$or'].push({
				"lastname": {
					$in: [new RegExp(search, 'i')]
				}
			});

		}

		if (regionId !== false && regionId !== '' && regionId !== undefined) {

			regionParams['$or'] = []
			regionParams['$or'].push({
				"regionId": regionId
			});

		}

		let expertsList = await UserShema
			.find({
				'$and': [
					searchParams,
					regionParams,
					{
						accountType: 'Expert'
					},
					{
						profileComplete: true
					}
				]
			})
			.skip(params.skip)
			.limit(params.limit)

		let expertsCount = await UserShema
			.find({
				'$and': [
					searchParams,
					regionParams,
					{
						accountType: 'Expert'
					},
					{
						profileComplete: true
					}
				]
			})
			.count()

		let result = {};

		result.expertsCount = expertsCount;
		result.expertsList = expertsList;

		return result

	},

};

//

module.exports = ExpertCore;