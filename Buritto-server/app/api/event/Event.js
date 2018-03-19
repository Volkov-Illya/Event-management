const EventCore = require('../../core/event/Event.js');
const UserShema = require('../../db/schemas/User.js');

const jwt_decode = require('jwt-decode');

const Event = {

	createEvent: async (req, res) => {

		let {
			eventTitle,
			firstPicker,
			secondPicker,
			tags,
			domains,
			region,
			regionId,
			status,
			description,
			userId,
			eventLogo
		} = req.body;

		let eventData = {
			eventTitle: eventTitle,
			eventStart: firstPicker,
			eventFinish: secondPicker,
			tags: tags,
			domains: domains,
			region: region,
			regionId: regionId,
			status: status,
			description: description,
			ownerId: +userId,
			eventLogo: eventLogo
		}

		let event = await EventCore.createEvent(eventData);

		if (event) {

			return res.send(event)

		}

		let error = util.errorHelper.badRequest('Server error');

		return res.send(error);

	},

	editEvent: async (req, res) => {

		let token = req.headers.authorization;
		let userId = jwt_decode(token)._doc.userId;

		// const checkEditPermissions

		let {
			eventId,
			eventTitle,
			eventStart,
			eventFinish,
			tags,
			domains,
			region,
			regionId,
			status,
			description,
			eventLogo
		} = req.body;

		let eventData = {
			eventId: eventId,
			eventTitle: eventTitle,
			eventStart: eventStart,
			eventFinish: eventFinish,
			tags: tags,
			domains: domains,
			region: region,
			regionId: regionId,
			status: status,
			description: description,
			ownerId: +userId,
			eventLogo: eventLogo
		}

		let event = await EventCore.editEvent(eventData);

		if (event) {

			return res.send(event)

		}

		let error = util.errorHelper.unauthorised('Server error');

		return res.status(error.code).send(error)

	},

	getList: async (req, res) => {

		let params = {};

		params.search = req.query.search;
		params.period = req.query.period;
		params.regionId = req.query.regionId;
		params.eventStart = new Date(req.query.eventStart);
		params.eventFinish = new Date(req.query.eventFinish);
		params.period = req.query.period;
		params.skip = +req.query.skip;
		params.limit = +req.query.limit;

		let eventsList = await EventCore.getList(params);


		if (eventsList) {

			return res.send(eventsList)

		}

		let error = util.errorHelper.badRequest('Server error');

		return res.send(error);

	},

	getUserEvents: async (req, res) => {

		let params = {};
		let userId = +req.query.userId;

		if (!userId) {

			let error = util.errorHelper.badRequest('User id cannot be null');

			return res.send(error);

		}

		params.userId = userId;
		params.search = req.query.search;
		params.period = req.query.period;
		params.regionId = req.query.regionId;
		params.eventStart = new Date(req.query.eventStart);
		params.eventFinish = new Date(req.query.eventFinish);
		params.period = req.query.period;
		params.skip = +req.query.skip;
		params.limit = +req.query.limit;

		let userEvents = await EventCore.getUserEvents(params);

		if (userEvents) {

			return res.send(userEvents)

		}

		let error = util.errorHelper.badRequest('Server error');

		return res.send(error);

	},

	getDetails: async (req, res) => {

		let eventId = +req.query.eventId;

		if (!eventId) {

			let error = util.errorHelper.badRequest('Event id cannot be null');

			return res.status(error.code).send(error)

		}

		let event = await EventCore.getDetails(eventId);

		if (event) {

			return res.send(event)

		}

		let error = util.errorHelper.badRequest(`Event with id ${eventId} not found`);

		return res.status(error.code).send(error)

	}


}

module.exports = Event;