const axios = require('axios');

async function getMovies(req, res){
  try {
    let city = req.query.searchQuery;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
    let moviesArray = movieData.data.results.map(movieObj => new Movie(movieObj));

    res.send(moviesArray);

  } catch (error) {    
    res.status(error.response.data.status_code).send(error.response.data.status_message)
  }
};

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.average_votes = movieObj.vote_average;
    this.total_votes = movieObj.vote_count;
    this.image_url = movieObj.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
      : "";
    this.popularity = movieObj.popularity;
    this.releasedOn = movieObj.release_date;
  }
}

module.exports = getMovies;