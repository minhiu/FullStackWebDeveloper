const express = require('express');
const bodyParser = require('body-parser');
const weatherApi = require('./services/weather-api');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {;
    const city = req.body.city;
    weatherData = await weatherApi.getCurrentWeatherData(city, 'metric');
    airPollution = await weatherApi.getAirPollutionData(city);
    res.write(`<h1>The temperature in ${city} is ${weatherData.main.temp} degrees celcius!</h1>`);
    res.write(`<p>The weather is currently ${weatherData.weather[0].description}`);
    res.write(`<p>co: ${airPollution.list[0].components.co}, no2: ${airPollution.list[0].components.no2}<p>`);
    res.write(`<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">`)
    res.send();
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});