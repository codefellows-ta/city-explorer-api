'use strict';

// Bring in raw weather data from JSON file
const superagent = require('superagent');

function Forecast(date, currentTemp, lowTemp, highTemp, description){
  this.date = date;
  this.currentTemp = currentTemp;
  this.lowTemp = lowTemp;
  this.highTemp = highTemp;
  this.description = description;
};

// Handler object for '/weather' route
const weather = {}; 

weather.handleGet = (req, res, next) => {

  const {lat, lon} = req.query;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lang=en&units=I&days=7&lat=${lat}&lon=${lon}`;

  superagent
  .get(url)
  .then(results => {
    console.log(results.body);
    let weather = [];
    results.body.data.map( day => {
      weather.push(new Forecast(day.datetime, day.temp, day.low_temp, day.high_temp, day.weather.description));
    });
    res.status(200).json(weather);
  })
  .catch(err =>
    console.log(err));

    
};

module.exports = weather;
