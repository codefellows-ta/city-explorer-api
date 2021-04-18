'use strict';

const superagent = require('superagent');

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
module.exports = (req, res, next) => {

  const { query } = req.query;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${query}`;

  superagent
  .get(url)
  .then(results => {

    let movieList = [];

    results.body.results.map( movie => {
      movieList.push(new Movies(
        movie.original_title,
        movie.overview,
        movie.vote_average,
        movie.vote_count,
        movie.popularity,
        movie.backdrop_path,
        movie.release_date,
      ));
    });

    res.status(200).json(movieList);
  })
  .catch(err => {
    console.error(err.message);
  });

};