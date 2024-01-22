const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Указываем express использовать папку public для статических ресурсов
app.use(express.static(path.join(__dirname, 'public')));

// Ваши маршруты
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

app.get('/weather', getDataFromOpenWeather);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
