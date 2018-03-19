/*
 * @author illya
 * Core server start
*/

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path')
const util = require('./utils/utils.js')
global._ = require('lodash');

// Detect environment

global.environment = require('./config/Environment.js');

// Setup mongod connections

global.MongoDB = require('./db/Connection.js');
global.util = util

const Router = require('./Router.js');

// Setup express server

global.app = express()
    .use( cookieParser() )
    // .use( multer({ dest: __dirname + '/uploads' }).any() )
    .use( bodyParser.urlencoded({ extended: true }) )
    .use( bodyParser.json({ limit: '15mb' }) );
    
app.set( 'jwtSecret', 'secret' );

//

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next()
});

// ServerRouter.setup( app );

Router.setup( app );

// 

app.listen( environment.web.port );

//

console.log( 'Buritto: ' + environment.name + ' service started.' );
console.log( 'Buritto started on port: ' + environment.web.port );
