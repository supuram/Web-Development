// Using Express to render a website with live API data

const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(req, res){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            res.sendStatus(temperature)
        })
    })
})
app.listen(3000, function(){
    console.log('Server is running')
})