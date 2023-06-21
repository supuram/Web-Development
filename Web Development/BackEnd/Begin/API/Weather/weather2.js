const express = require('express')
const https = require('https')
const app = express()

app.get('/', function(){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1d2eae3e6b77b4eeaca46228889115c5'
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
        })
    })
})
app.listen(3000, function(){
    console.log('Server is running')
})

/*
response is an object representing the HTTP response from the API, while weatherData is an object representing the 
weather data returned by the API.
The response object contains information about the HTTP response, such as the status code and headers, as well as 
the data returned by the API. The data returned by the API is in JSON format and is contained within the response 
object.
JSON.parse(data) is used to parse the data received from the API, which is in JSON format, and convert it into a 
JavaScript object. This allows the weather data to be accessed and manipulated as a JavaScript object within the 
code.

response is an object representing the HTTP response from the API. It contains information about the HTTP response, 
such as the status code and headers, as well as the data returned by the API.
The data returned by the API is in JSON format and is contained within the response object. JSON.parse(data) is 
used to parse this data and convert it into a JavaScript object. The resulting object is assigned to the weatherData 
variable and represents the weather data returned by the API.
In other words, response contains both information about the HTTP response and the data returned by the API, while 
weatherData only contains the weather data returned by the API.

JSON.parse(data) is used to parse the data received from the API, which is in JSON format, and convert it into a 
JavaScript object.
The resulting object is assigned to the weatherData variable and represents the weather data returned by the API. 
This allows the weather data to be accessed and manipulated as a JavaScript object within the code.
*/