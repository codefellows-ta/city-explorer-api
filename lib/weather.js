'use strict';

const superagent = require('superagent');
const cache = require('./data/cache.js');

// Constructor function for generating formated weather forcast
function Forecast(date, currentTemp, lowTemp, highTemp, description){
  this.date = date;
  this.currentTemp = currentTemp;
  this.lowTemp = lowTemp;
  this.highTemp = highTemp;
  this.description = description;
};

// Handler for '/weather' route
module.exports = getWeather;

function getWeather(lat, lon) {

  let key = `weather-${lat}${lon}`;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;

  if(cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('weather cache hit');
  } else {
    console.log('weather cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
      .then(res => parseWeather(res.body));
  };
  return cache[key].data;
};
 
function parseWeather(weatherData) {
  try {
    const summaries = weatherData.data.map(day => {
      return new Forecast(day.datetime, day.temp, day.low_temp, day.high_temp, day.weather.description)
    });
    return Promise.resolve(summaries);
  } catch(e) {
    return Promise.reject(e);
  }
};


//   superagent
//   .get(url)
//   .then(results => {
//     let weather = [];
//     results.body.data.map( day => {
//       weather.push(new Forecast(day.datetime, day.temp, day.low_temp, day.high_temp, day.weather.description));
//     });
//     res.status(200).json(weather);
//   })
//   .catch(err => console.log(err));
    
// };
