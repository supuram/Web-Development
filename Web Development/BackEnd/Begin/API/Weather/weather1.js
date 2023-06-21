const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        console.log(response)
        response.on('data', function(data){
            console.log(data)
        })
    })
})
app.listen(3000, function(){
    console.log('Server is runnung')
})