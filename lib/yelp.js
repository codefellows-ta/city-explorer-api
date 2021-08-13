'use strict';

const superagent = require('superagent');
const cache = require('./data/cache.js');

function Yelp(name) {
  this.name = name;
};

module.exports = getYelp;

function getYelp(city) {
  let key = `yelp-review:${city}`;
  let url = `https://api.yelp.com/v3/businesses/search?location=${city}&term=coffee`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('yelp cache hit');
  } else {
    console.log('yelp cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
      .set({'Authorization': `Bearer ${process.env.YELP_KEY}`})
      .then(res => parseYelp(res.body))
      .catch(e => {
        console.log(e.message);
      });
  };
  return cache[key].data;
};

function parseYelp(yelpData) {
  try {
    const summaries = yelpData.businesses.map(review => {
      return new Yelp(review.name)
    });
    // console.log(summaries);
    return Promise.resolve(summaries);
  } catch(e) {
    return Promise.reject(e);
  };
};
