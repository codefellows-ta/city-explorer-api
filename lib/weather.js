'use strict';

const superagent = require('superagent');

// Constructor function for generating formated weather forcast
function Forecast(date, currentTemp, lowTemp, highTemp, description){
  this.date = date;
  this.currentTemp = currentTemp;
  this.lowTemp = lowTemp;
  this.highTemp = highTemp;
  this.description = description;
};

// Handler for '/weather' route
module.exports = (req, res, next) => {

  const {lat, lon} = req.query;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lang=en&units=I&days=10&lat=${lat}&lon=${lon}`;

  superagent
  .get(url)
  .then(results => {
    let weather = [];
    results.body.data.map( day => {
      weather.push(new Forecast(day.datetime, day.temp, day.low_temp, day.high_temp, day.weather.description));
    });
    res.status(200).json(weather);
  })
  .catch(err => console.log(err));
    
};
