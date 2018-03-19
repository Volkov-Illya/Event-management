/*
 * @author illya
 * Mongo DB connection setup
*/

var mongoose = require('mongoose');
var environment = require( './../config/LocalEnvironment.js')
mongoose.Promise = global.Promise;

//

mongoose.connect( environment.mongoDB.url );

var connection = mongoose.connection;

connection.on( 'error', console.error.bind ( console, 'connection error' ) );
connection.once( 'open', function ( callback ) {

    console.log( 'Buritto: MongoDB connection succeeded.' );

});

//

module.exports = {
    mongoose: mongoose,
    connection: connection
};
