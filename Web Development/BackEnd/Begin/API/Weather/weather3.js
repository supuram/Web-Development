const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        response.on('data', function(data){
            //const weatherData = JSON.parse(data)
            const obj = {
                name: "Supra",
                occupation: "Teacher"
            }
            console.log(JSON.stringify(obj))
        })
    })
})
app.listen(3000, function(){
    console.log('Server is running')
})