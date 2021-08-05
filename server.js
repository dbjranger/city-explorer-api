'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const axios = require('axios');
const PORT = process.env.PORT;


class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description.toLowerCase()}`;
    this.date = day.datetime;
  }
}

// Not using Weather JSON file anymore //
// const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Hello, from the server!');
});

app.get('/weather', async (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let cityFound = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);

// console.log("This is", cityFound.data);
 
response.send(cityFound.data.data.map(day => new Forecast(day)));


//   let forecastArray = [];

//   if (cityFound.data) {

    // cityFound.data.data.forEach(obj => forecastArray.push(new Forecast(, )));
//     response.send(forecastArray);
//   } else {
//     response.status(400).send('No weather data exists for this city');
//   }
});

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exists');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
