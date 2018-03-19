/*
 * @author illya
 * Staging environment config file
 */

var config = {

	name: 'Staging test environment',

	mongoDB: {
		// url:        'mongodb://illya:aloha5501@ds135777.mlab.com:35777/heroku_zkmnt7jx'
		url: 'mongodb://illya:aloha5501@ds053251.mlab.com:53251/arch-v1-local'

	},

	web: {
		host: 'http://localhost',
		port: process.env.PORT || 3003
	}

};

//

module.exports = config;