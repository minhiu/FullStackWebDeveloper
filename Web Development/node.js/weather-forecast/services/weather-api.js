const https = require('https')
const weatherDataUrl = new URL ('https://api.openweathermap.org/data/2.5/weather?q={city}&units={unit}&appid={apikey}');
const airPollutionDataUrl = new URL ('https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={apikey}');
const apiKey = '7df69c1ecd454d9b1e57a7bc4be4a838';

exports.getCurrentWeatherData = async (city, unit) => {

    weatherDataUrl.searchParams.set('q', city);
    weatherDataUrl.searchParams.set('units', unit);
    weatherDataUrl.searchParams.set('appid', apiKey);
    let data = new Promise((resolve) => {
        https.get(weatherDataUrl, (res) => {
            let chunk = '';
            res.on('data', (data) => {
                chunk += data;
                chunk = JSON.parse(chunk);
            });

            res.on('end', () => {
                resolve(chunk);
            })
        });
    });

    return await data;
}

exports.getAirPollutionData = async (city) => {
    const weatherData = await this.getCurrentWeatherData(city);
    const {lon, lat} = weatherData.coord;
    airPollutionDataUrl.searchParams.set('lat', lat);
    airPollutionDataUrl.searchParams.set('lon', lon);
    airPollutionDataUrl.searchParams.set('appid', apiKey);
        
    let data = new Promise((resolve) => {
        https.get(airPollutionDataUrl, (res) => {
            let chunk = '';
            res.on('data', (data) => {
                chunk += data;
                chunk = JSON.parse(chunk);
            })

            res.on('end', () => {
                resolve(chunk);
            });
        });
    }); 

    return await data;
}