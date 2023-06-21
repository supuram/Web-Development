// Using BodyParser to Parse post requests to the Server

const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(_req, res){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL =  "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.set('Content-Type', 'text/html')
            res.write(temperature.toString())
            res.write(weatherDescription)
            res.write("<img src = "+imageURL+">")
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log('Server is running')
})