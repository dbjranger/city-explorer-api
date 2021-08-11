const axios = require('axios');

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";
    this.popularity = movie.popularity;
    this.releasedOn = movie.release_date;
  }
}

async function getMovies(request, response){
  try {
    let city = request.query.searchQuery;
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
    let moviesArray = movieData.data.results.map(movie => new Movie(movie));

    response.send(moviesArray);

  } catch (error) {    
    response.status(error.response.data.status_code).send(error.response.data.status_message)
  }
};



module.exports = getMovies;