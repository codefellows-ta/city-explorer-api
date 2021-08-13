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
const weather = require('./weather.js');
const movies = require('./movies.js');
const yelp = require('./yelp.js');
const handleNotFound = require('./not-found.js');
const handleServerError = require('./server-error.js');

// express API routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello World')
});

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => {
    response.status(200).json(summaries)
  })
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
};  

app.get('/movies', movieHandler);

function movieHandler(request, response) {
  const { query } = request.query;
  movies(query)
  .then(summaries => {
    response.status(200).json(summaries)
  })
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
};

app.get('/yelp', yelpHandler);

function yelpHandler(req, res) {
  const { city } = req.query;
  yelp(city)
  .then(summaries => {
    // console.log(summaries[0]);
    res.status(200).json(summaries);
  })
  .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
};

// Handle not found errors (404)
app.use('*', handleNotFound);

// Handle server errors (500)
app.use(handleServerError);

module.exports = {
  start: (port) => app.listen(port, () => console.log(`server up on ${port}`)),
  app,
};