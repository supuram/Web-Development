// Using BodyParser to Parse post requests to the Server

const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(_req, res){
    res.sendFile(__dirname + '/weather.html')
})

app.post('/', function(req, res){
    const query = req.body.cityName
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=1d2eae3e6b77b4eeaca46228889115c5'
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