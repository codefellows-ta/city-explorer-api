'use strict';

// This is used to access environmental variable from the .env file
require('dotenv').config();

// Bring in the server file
const server = require('./lib/server.js');

// Establish connection to server
server.start(process.env.PORT)