const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const API_KEY = 'ea417e865a4e114c1ce806732874c8b1'; 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const cityName = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                const temperature = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon; 
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; 

                
                res.send(`
                    <h1>The temperature in ${cityName} is ${temperature}°C</h1>
                    <p>Description: ${description}</p>
                    <img src="${iconUrl}" alt="${description}">
                    <br><br>
                    <a href="/">Go back</a>
                `);
            });
        } else {
            res.send(`
                <h1>Error: City not found</h1>
                <a href="/">Go back</a>
            `);
        }
    }).on("error", (err) => {
        res.send(`
            <h1>Error: ${err.message}</h1>
            <a href="/">Go back</a>
        `);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
