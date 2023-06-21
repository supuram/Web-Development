const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        console.log(response)
    })
})
app.listen(3000, function(){
    console.log('Server is runnung')
})

/*
response is an object representing the HTTP response from the API. The response.on('data', function(data){...}) 
method is used to listen for data events emitted by the response object. When a data event is emitted, the callback 
function is called with the data as an argument.
*/