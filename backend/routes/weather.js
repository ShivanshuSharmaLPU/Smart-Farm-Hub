const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET api/weather/:location
// @desc    Get weather data
// @access  Public (or Private)
router.get('/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const apiKey = process.env.WEATHER_API_KEY;
        // Using OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);

        // Extract relevant data
        const weatherData = {
            temp: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            city: response.data.name
        };

        res.json(weatherData);
    } catch (err) {
        console.error("Weather API Error:", err.message);
        // Fallback to Mock Data if API fails (e.g. invalid key)
        res.json({
            temp: 24,
            humidity: 60,
            description: 'Sunny (Mock)',
            icon: '01d',
            city: req.params.location || 'Demo City'
        });
    }
});

module.exports = router;
