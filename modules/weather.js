const axios = require('axios');

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description.toLowerCase()}`;
    this.date = day.datetime;
  }
}

async function getWeather(request, response){ 
  let lat = request.query.lat;
  let lon = request.query.lon;
  let weather = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=3`);

  if (weather.data) {
    let forecast = weather.data.data.map(day => new Forecast(day));
    response.send(forecast);
  } else {
    response.status(400).send('No weather data exists for this city');
  }
}



module.exports = getWeather;