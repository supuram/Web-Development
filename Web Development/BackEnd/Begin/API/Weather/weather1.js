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

/*
response is an object representing the HTTP response from the API. The response.on('data', function(data){...}) 
method is used to listen for data events emitted by the response object. When a data event is emitted, the callback 
function is called with the data as an argument.

You cannot use app.get() instead of https.get() in this code snippet. app.get() is a method in the Express.js web 
application framework that is used to route HTTP GET requests to a specified path with specified callback functions. 
It is intended for handling incoming HTTP GET requests to your Express application.

On the other hand, https.get() is a method in the Node.js https module that is used to make an HTTP GET request to 
a remote server. It is intended for making outgoing HTTP GET requests from your Node.js application.

In this code snippet, https.get() is being used to make an HTTP GET request to the OpenWeatherMap API to retrieve 
weather data for London. This is an outgoing request from your Node.js application to the OpenWeatherMap API server.

Q)So app.get is from client to my server whereas https.get is from me to another remote server ?
In summary, app.get() is used to handle incoming HTTP GET requests from clients to your server, while https.get() is 
used to make outgoing HTTP GET requests from your server to a remote server.
*/