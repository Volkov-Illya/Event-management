/*
 * @author illya
 * Core methods for events
 */

const EventShema = require('./../../db/schemas/Event.js');
const UserShema = require('./../../db/schemas/User.js');

const EventCore = {

	createEvent: async (eventData) => {

		let ownerId = +eventData.ownerId
		let user = await UserShema.findOne({
			userId: +ownerId
		});

		if (!user) {

			let error = util.errorHelper.badRequest(`User with id ${eventData.ownerId} not found`)

			return error;

		}

		const newEvent = new EventShema(eventData);

		let eventSaved = await newEvent.save()

		if (eventSaved) {

			return eventData;

		}

	},

	editEvent: async (eventData) => {

		let event = await EventShema.findOneAndUpdate({
			eventId: eventData.eventId,
			ownerId: eventData.ownerId
		}, eventData, {
			new: true
		})

		if (!event) {

			let error = util.errorHelper.badRequest(`Event with id ${eventData.eventId} not found`)

			return error;

		}

		return event;

	},

	getList: async (params) => {

		let filter = {};
		let searchParams = {};
		let regionParams = {};
		let search = params.search;
		let regionId = params.regionId;

		if (search !== false && search !== '') {

			searchParams['$or'] = [];

			searchParams['$or'].push({
				"eventTitle": new RegExp(search, 'i')
			});

			searchParams['$or'].push({
				"tags": {
					$in: [new RegExp(search, 'i')]
				}
			});

			searchParams['$or'].push({
				"domains": {
					$in: [new RegExp(search, 'i')]
				}
			});

		}

		if (params.period) {

			filter['$and'] = [];

			if (params.eventStart instanceof Date && !isNaN(params.eventStart.valueOf())) {

				filter['$and'].push({
					"eventStart": {
						"$gt": params.eventStart
					}
				})

			}

			if (params.eventFinish instanceof Date && !isNaN(params.eventFinish.valueOf())) {

				filter['$and'].push({
					"eventFinish": {
						"$lte": params.eventFinish
					}
				})

			}

			filter['$and'].push(searchParams)

		}

		if (regionId !== false && regionId !== '') {

			regionParams['$or'] = []
			regionParams['$or'].push({
				"regionId": regionId
			})

		}

		let eventsList = await EventShema
			.find({
				'$and': [
					filter,
					searchParams,
					regionParams
				]
			})
			.skip(params.skip)
			.limit(params.limit)

		let eventsCount = await EventShema
			.find({
				'$and': [
					filter,
					searchParams,
					regionParams
				]
			})
			.count()

		let result = {};

		result.eventsCount = eventsCount;
		result.eventsList = eventsList;

		return result

	},

	getUserEvents: async (params) => {

		let user = await UserShema.findOne({
			userId: +params.userId
		});

		if (!user) {

			let error = util.errorHelper.badRequest(`User with id ${params.userId} not found`)

			return error;

		}

		let filter = {};
		let searchParams = {};
		let regionParams = {};
		let search = params.search;
		let regionId = params.regionId;

		if (search !== false && search !== '') {

			searchParams['$or'] = [];

			searchParams['$or'].push({
				"eventTitle": new RegExp(search, 'i')
			});

			searchParams['$or'].push({
				"tags": {
					$in: [new RegExp(search, 'i')]
				}
			});

			searchParams['$or'].push({
				"domains": {
					$in: [new RegExp(search, 'i')]
				}
			});

		}

		if (params.period) {

			filter['$and'] = [];

			if (params.eventStart instanceof Date && !isNaN(params.eventStart.valueOf())) {

				filter['$and'].push({
					"eventStart": {
						"$gt": params.eventStart
					}
				})

			}

			if (params.eventFinish instanceof Date && !isNaN(params.eventFinish.valueOf())) {

				filter['$and'].push({
					"eventFinish": {
						"$lte": params.eventFinish
					}
				})

			}

			filter['$and'].push(searchParams)

		}

		if (regionId !== false && regionId !== '') {

			regionParams['$or'] = []
			regionParams['$or'].push({
				"regionId": regionId
			})

		}

		let userEvents = await UserShema
			.find({
				userId: +params.userId
			})
			.populate({
				path: 'events',
				match: filter,
				options: {
					limit: params.limit,
					skip: params.skip
				}
			});

		let eventsCount = await UserShema
			.find({
				userId: +params.userId
			})
			.populate({
				path: 'events',
				match: filter,
			})

		let result = {};

		result.eventsCount = eventsCount[0].events.length;
		result.eventsList = userEvents[0].events;

		return result;

	},

	getDetails: async (eventId) => {

		let eventDetails = await EventShema
			.find({
				'eventId': eventId
			})

		if (eventDetails.length) {

			return eventDetails[0];

		}

	}

};

//

module.exports = EventCore;