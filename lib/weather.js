'use strict';

// Bring in raw weather data from JSON file
const superagent = require('superagent');

function Forecast(date, description){
  this.date = date;
  this.description = description;
};

// Handler object for '/weather' route
const weather = {}; 

weather.handleGet = async (req, res, next) => {
  try {

    let weatherRequest = superagent.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lang=en&units=I&days=7&lat=${}%lon=${}`)

    res.status(200).json(rawForecast);
  } catch(err) {
    res.status(500).send(err.message)
  }
};

module.exports = weather;