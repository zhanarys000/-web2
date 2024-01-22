const axios = require('axios');

const getDataFromOpenWeather = async (req, res) => {
    try {
        const { cityName } = req.query;

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getDataFromOpenWeather };
