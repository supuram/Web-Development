const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

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
    // Render the EJS template with the data
    res.render('template9', {data: data})
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred');
  })
})

app.post('/', (req, res) => {
    const input = req.body.input; /* input in the req.body.input is the name ="input" in <input type="number" 
    id="title" name="input">. req.body contains data from the form */
  
    axios.request(options).then(response => {
        const data = response.data;

        // Render the EJS template with the data and input
        res.render('template9', {data: data, input: input})

        // Extract the data associated with the input ID
        const idData = data.response.find(item => item.id === parseInt(input));
        // find can be used with only arrays

        fs.writeFile('number10.txt', JSON.stringify(idData), (err) => {
            // use fs.appendFile if you do not want the data in nymber10.txt to be overwritten
            if (err) {
                console.error(err);
                res.status(500)
            } 
        })
    }).catch(error => {
      console.error(error);
    })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

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
-----------------------------------------------------------------------------------------------------------------
*! Q)so axios always returns from the remote server an array of objects like here response is an array of objects
No, axios does not always return an array of objects from the remote server. The data returned by axios depends on 
the API you’re calling and the format of the data it returns.
When you make a request using axios, it sends an HTTP request to the specified URL and returns a Promise that 
resolves with an object representing the response from the server. This response object has several properties, 
including a data property that contains the data returned by the server.

The format and structure of this data depend on the API you’re calling and how it returns its data. Some APIs might 
return data as an array of objects, while others might return data as a single object, a string, a number, etc. The 
structure of the data is determined by the API, not by axios.

In your case, it looks like the API you’re calling returns data as an object with a response property that is an 
array of objects representing leagues. This is why you can access this array using data.response in your code. But 
this is specific to the API you’re using and may not be true for other APIs.
----------------------------------------------------------------------------------------------------------------
*! hey i am confused now.
*!axios.request(options).then(response => {
*!       const data = response.data;
*! In this code snippet, .then(response=> , response is an object returned by the api which contains the data of the 
*! api. But in data.response, response is an array of objects ?

*? In the code snippet you provided, response is an object returned by the axios.request method that represents the 
*? entire HTTP response from the server. This response object has several properties, including a data property that 
*TODO contains the data returned by the server.
The value of the data property is determined by the API you’re calling and the format of the data it returns. In
your case, it looks like the API you’re calling returns data as a JSON object with a response property that is an 
array of objects representing leagues.
So, when you assign const data = response.data, data becomes a JavaScript object that represents the data returned
*? by the API. This data object has a response property that is an array of objects representing leagues.
In summary: response is an object returned by axios.request that represents the entire HTTP response from the 
server. data is a property of this object that contains the data returned by the server. And data.response is a 
property of the data object that is an array of objects representing leagues.
-----------------------------------------------------------------------------------------------------------------
*! req.body.input is a string type ?
Yes, req.body.input is typically a string. When a user submits a form in a web browser, the data from the form is 
sent to the server as a string in the body of the HTTP request. The body-parser middleware that you’re using in 
*? your Express app parses this string and converts it into a JavaScript object, which is then available as the 
req.body property.
However, even though body-parser converts the data from the form into a JavaScript object, it does not automatically
convert the individual values within that object from strings to other types (such as numbers). So, if the form 
contains an input field with name="input", then the value of that input field will be available as req.body.input, 
but it will still be a string.
If you want to use this value as a number (e.g. for comparison with other numbers), you need to convert it from a 
string to a number first. You can do this using parseInt
*/