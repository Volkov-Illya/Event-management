/*
 * @author illya
 * Staging environment config file
 */

var config = {

	name: 'Production environment',

	mongoDB: {
		// url:        'mongodb://illya:aloha5501@ds135547.mlab.com:35547/heroku_k6lv5csz'
		url: 'mongodb://illya:aloha5501@ds053251.mlab.com:53251/arch-v1-local'

	},

	web: {
		host: 'http://localhost',
		port: process.env.PORT || 3003
	}

};

//

module.exports = config;