// Done by Bing

const express = require('express');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs')

const options = {
    method: 'GET',
    url: 'https://v1.baseball.api-sports.io/leagues',
    headers: {
      'x-rapidapi-key': '03751dc23ed8813648f541bee3d317bb'
    }
}

app.get('/', (req, res) => {
  axios.request(options).then(response => {
    const data = response.data;
// will convert the data object or value to a JSON string and format it with 2 spaces of indentation for readability.
    const formattedData = JSON.stringify(data, null, 2);
    // Render the EJS template with the data
    res.render('template', {data: formattedData});
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred');
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/*
app.get() is a method in the Express.js web application framework that is used to route HTTP GET requests to a 
specified path with specified callback functions. It is intended for binding middleware to your application.

When you call app.get() with a specified path and callback function, Express will route any incoming HTTP GET 
requests that match the specified path to the callback function. The callback function can then handle the request 
and send a response back to the client.
*/

/*
https.get() and axios.request() are both methods that can be used to make outgoing HTTP GET requests from your 
server to a remote server. However, they are provided by different libraries and have some differences in their 
functionality and usage.

https.get() is a method in the Node.js https module, which is a built-in module that provides support for the HTTPS 
protocol. It provides a low-level interface for making HTTPS requests and requires you to manually handle aspects 
such as parsing the response data and handling errors.

On the other hand, axios.request() is a method provided by the Axios library, which is a third-party library that 
provides a higher-level interface for making HTTP requests. It provides features such as automatic JSON data 
transformation, request and response interception, and more convenient error handling.

The existence of both methods gives developers the flexibility to choose the one that best fits their needs. Some 
developers may prefer to use the built-in https.get() method for its simplicity and direct access to the underlying 
HTTPS protocol, while others may prefer to use the Axios library for its additional features and convenience.
*/

/*
You cannot use axios.req instead of axios.request in this code snippet because axios.req is not a valid method 
provided by the Axios library.
Axios provides several methods for making HTTP requests, including axios.request, axios.get, axios.post, axios.put, 
and others. Each of these methods corresponds to a specific HTTP method and can be used to make an HTTP request 
using that method.

Q)So if i cannot use axios.req, can i delete the req and res from app.get ?
No, you cannot delete the req and res parameters from the app.get() callback function. These parameters represent 
the request and response objects, respectively, and are required for handling incoming HTTP GET requests in your 
Express application.
The req parameter represents the incoming HTTP request and contains information about the request, such as the 
request headers, query parameters, and body data. The res parameter represents the outgoing HTTP response and 
provides methods for sending a response back to the client, such as res.send() and res.json().
Here’s an example that shows how to use the req and res parameters in an app.get() callback function

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  / Access request information using the req parameter
  const query = req.query;
  console.log(query);

  / Send a response back to the client using the res parameter
  res.send('Hello World!');
});

app.listen(3000);
In this example, the req.query property is used to access the query parameters of the incoming HTTP GET request. 
The res.send() method is then used to send a response back to the client with the text 'Hello World!'.
*/
/**
* !Q)if I don't write JSON.strigify then in the output i only see [object Object]. but i should show the JSON 
* ! object which contains the values. why it only shows [object Object], why not the data itself?
*? In JavaScript, when you try to convert an object to a string (for example, by concatenating it with a string 
*? or passing it to a method that expects a string), the default behavior is to return the string '[object Object]'. 
*? This is why you see '[object Object]' instead of the actual data when you don’t use JSON.stringify() to convert
*? the data object to a JSON string.
* 
* !Q)But when i write console.log(response.data), i can see all the data inside the JSON object ? Why ?
* ? When you use console.log(response.data) to log the response.data object to the console, the console will 
* ? display a string representation of the object that includes its properties and values. This is because the 
* ? console.log() method has built-in functionality to display objects in a human-readable format.

*? In contrast, when you pass an object to a method that expects a string (such as res.send() or res.render()), 
*? the object is automatically converted to a string using its toString() method. For most objects, the default 
*? behavior of the toString() method is to return the string '[object Object]', which is why you see this string 
*? instead of the actual data when you don’t use JSON.stringify() to convert the object to a JSON string.

*! Q)So res.render sends data from my server to the client and can use some file like .ejs for it ?
*? Yes, that is correct. res.render() is a method in the Express.js web application framework that is used to 
*? render a view template and send the resulting HTML to the client. It takes the name of the view template to 
*? render and an object containing the data to be passed to the template as arguments.

*? In your code snippet, res.render('template', {data: formattedData}) is used to render a view template named 
*? 'template' using the data contained in the formattedData variable. The resulting HTML is then sent to the 
*? client as part of the HTTP response.
*/

/**
In the JSON data you provided, data is an object that contains a property named response. The value of this response
property is an array of objects, each representing a league.

When you make an API request using axios, the response data is returned as a JavaScript object. This object has the 
same structure as the JSON data returned by the API. So, if the API returns JSON data with a response property that 
is an array, then the data object returned by axios will also have a response property that is an array.

In your code, you’re assigning the value of response.data to a variable named data. This means that data is an 
object that represents the entire response from the API. To access the array of leagues within this object, you can 
use the response property of the data object: data.response.

So, in summary: data is an object that represents the entire response from the API. This object has a property 
named response, which is an array of objects representing leagues. You can access this array using data.response.
*/