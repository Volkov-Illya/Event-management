/*
 * @author illya
 * App endvironment manager
 */

var environment;

if (__dirname.indexOf('/buritto-prod/') !== -1) {

	environment = require('./ProductionEnvironment.js');

} else if (__dirname.indexOf('/buritto-stage/') !== -1) {

	environment = require('./StageEnvironment.js');

} else {

	environment = require('./LocalEnvironment.js');

}

//

module.exports = environment;