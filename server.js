const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle weather form submission (stub)
app.post('/weather', async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    try {
        const apiKey = 'cdd2015dbd09450c912125852251008'; // Your API key
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await axios.get(apiUrl);
        const weather = response.data;

        res.render('weather', {
            location: weather.location.name,
            temp: weather.current.temp_c,
            description: weather.current.condition.text
        });
    } catch (error) {
        res.send('Could not retrieve weather data. Please try again.');
        console.log(error);
    }
    console.log('Success');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});