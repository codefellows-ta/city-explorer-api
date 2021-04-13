'use strict';

// Bring in raw weather data from JSON file
const rawData = require('./data/weather.json');

function Forecast(date, description){
  this.date = date;
  this.description = description;
};

// Handler object for '/weather' route
const weather = {}; 

weather.handleGet = (req, res, next) => {
  try {
    const rawForecast = rawData.data.map( day => {
      return new Forecast(day.datetime, `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`);
    });

    const weatherObj = {
      city: rawData.city_name,
      lat: rawData.lat,
      lon: rawData.lon,
    };

    res.status(200).json(rawForecast);
  } catch(err) {
    res.status(500).send(err.message)
  }
};

module.exports = weather;