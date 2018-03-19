/*
 * @author illya
 * Local environment config file
 */

var config = {
	name: 'Local dev environment',

	mongoDB: {
		// url : 'mongodb://localhost/arch-v1-local'
		url: 'mongodb://illya:aloha5501@ds053251.mlab.com:53251/arch-v1-local'
	},

	web: {
		host: 'http://localhost',
		port: process.env.PORT || 3003
	}

};

//

module.exports = config;