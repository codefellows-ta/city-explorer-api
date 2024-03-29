'use strict';

const superagent = require('superagent');
const cache = require('./data/cache.js');

// Constructor object for generating formated movie objects
function Movies(title, synopsis, avgVotes, totalVotes, popularity, imageUrl, releaseDate) {
  this.title = title ? title : 'Title not available';
  this.synopsis = synopsis;
  this.avgVote = avgVotes;
  this.totalVotes = totalVotes;
  this.popularity = popularity;
  this.imageUrl = imageUrl ? `https://image.tmdb.org/t/p/w500${imageUrl}` : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3740&q=80' // will either be backdrop_path or poster_path
  this.releaseDate = releaseDate;
};

// handler for /movies route
module.exports = getMovies;

function getMovies(city) {
  let key = `movies-${city}`;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`;
  
  if(cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('movie cache hit');
  } else {
    console.log('movie cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
      .then(res => parseMovies(res.body));
  };
  return cache[key].data;
};

function parseMovies(movieData) {
  try {
    const summaries = movieData.results.map(movie => {
      return new Movies(
        movie.original_title,
        movie.overview,
        movie.vote_average,
        movie.vote_count,
        movie.popularity,
        movie.backdrop_path,
        movie.release_date,
      )
    });
    return Promise.resolve(summaries);
  } catch(e) {
    return Promise.reject(e);
  }
};

//   superagent
//   .get(url)
//   .then(results => {

//     let movieList = [];

//     results.body.results.map( movie => {
//       movieList.push(new Movies(
//         movie.original_title,
//         movie.overview,
//         movie.vote_average,
//         movie.vote_count,
//         movie.popularity,
//         movie.backdrop_path,
//         movie.release_date,
//       ));
//     });

//     res.status(200).json(movieList);
//   })
//   .catch(err => {
//     console.error(err.message);
//   });

// };