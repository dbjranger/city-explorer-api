const axios = require('axios');

async function getWeather(request, response){
  
  let latRequested = request.query.lat;
  let lonRequested = request.query.lon;
  
  let weatherRaw = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latRequested}&lon=${lonRequested}&days=3`);

  if (weatherRaw.data) {
    let forecast = weatherRaw.data.data.map(obj => new Forecast(obj));
    response.send(forecast);
  } else {
    response.status(400).send('No weather data exists for this city');
  }
}

class Forecast {
  constructor(obj) {
    this.description = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description.toLowerCase()}`;
    this.date = obj.datetime;
  }
}

module.exports = getWeather;