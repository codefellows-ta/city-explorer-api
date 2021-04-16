'use strict';

const superagent = require('superagent');

// Constructor object for generating formated movie objects
function Movies(title, synopsis, avgVotes, totalVotes, popularity, imageUrl, releaseDate) {
  this.title = title ? title : 'Title not available';
  this.synopsis = synopsis;
  this.avgVote = avgVotes;
  this.totalVotes = totalVotes;
  this.popularity = popularity;
  this.imageUrl = imageUrl ? imageUrl : 'https://via.placeholder.com/150' // will either be backdrop_path or poster_path
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
        movie.poster_path,
        movie.release_date,
      ));
    });

    res.status(200).json(movieList);
  })
  .catch(err => {
    console.error(err.message);
  });

};