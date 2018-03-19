const Express = require('express');
const path = require('path');
const api = require('./api/Api.js');
//

const Router = {};

Router.setup = function (expressAPP) {

	Router.setupApi(expressAPP);

};

Router.setupApi = function (app) {

	// Auth api

	app.post('/api/auth/signup', api.auth.core.register);
	app.post('/api/auth/signin', api.auth.core.login);

	// Event api

	app.post('/api/event/createEvent', api.guard.core.checkJwt, api.event.core.createEvent);
	app.get('/api/event/getList', api.guard.core.checkJwt, api.event.core.getList);
	app.get('/api/event/getUserEvents', api.guard.core.checkJwt, api.event.core.getUserEvents);
	app.get('/api/event/getDetails', api.guard.core.checkJwt, api.event.core.getDetails);
	app.post('/api/event/editEvent', api.guard.core.checkJwt, api.event.core.editEvent);

	// Expert api

	app.post('/api/expert/profileForm', api.guard.core.checkJwt, api.expert.core.profileForm);
	app.post('/api/expert/editProfile', api.guard.core.checkJwt, api.expert.core.editProfile);
	app.get('/api/expert/getList', api.guard.core.checkJwt, api.expert.core.getList);

	// Manager api

	app.post('/api/manager/companyProfileForm', api.guard.core.checkJwt, api.manager.core.companyProfileForm);
	app.post('/api/manager/editProfile', api.guard.core.checkJwt, api.manager.core.editProfile);

};

//

module.exports = Router;