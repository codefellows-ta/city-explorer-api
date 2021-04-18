'use strict';

// Bring in third-party libraries
const express = require('express');
const cors = require('cors');

// Set up new instance of express
const app = express();

// Lets use some middleware!
app.use(express.json());
app.use(cors());

// Import custom modules
const handleWeather = require('./weather.js');
const handleMovies = require('./movies.js');
const handleNotFound = require('./not-found.js');
const handleServerError = require('./server-error.js');

// express API routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello World')
});

app.get('/weather', handleWeather);
app.get('/movies', handleMovies);

// Handle not found errors (404)
app.use('*', handleNotFound);

// Handle server errors (500)
app.use(handleServerError);

module.exports = {
  start: (port) => app.listen(port, () => console.log(`server up on ${port}`)),
  app,
};