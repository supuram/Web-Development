/**
 * ! See template9.ejs for this
 */

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

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
    }).catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    })
  })

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

/**
*!A GET request is used to retrieve data from a server. It is typically used to request a web page or other resources
from a server. When you enter a URL in your web browser or click on a link, your browser sends a GET request to the 
server to retrieve the requested page or resource.

*? A POST request is used to send data to a server. It is typically used to submit form data or other user input to a 
server for processing. When you fill out a form on a web page and click the submit button, your browser sends a POST
request to the server with the form data in the request body.

*TODO In Express.js, you can use the app.get method to define a route handler for GET requests and the app.post 
method to define a route handler for POST requests.

app.get and app.post are server-side functions that define the routes and specify the behavior when the server 
*? receives a GET or POST request at a particular endpoint. These routes are defined on the server using the Express
framework.

On the client-side, you can use fetch to send GET or POST requests to the server's defined endpoints. The server's 
*! app.get or app.post route handlers will then execute the specified logic to handle these requests and send the 
*? appropriate response back to the client.

In summary, app.get and app.post are used on the server-side to define routes, while fetch is used on the 
*? client-side to send HTTP requests to those routes on the server.
==================================================================================================================
*! In the provided code, `app.get` is used to define a route that handles the GET request sent by the browser to a 
*! specific endpoint. In this case, the endpoint is `'/'`, which corresponds to the root URL of your application.

When the browser navigates to the root URL (e.g., `http://localhost:4000/`), it sends a GET request to the server. 
*? The `app.get` route handler in your code specifies the behavior for this GET request. It uses the Axios library 
*? to make an additional GET request to an external API (`https://v1.baseball.api-sports.io/leagues`) and retrieves 
*? the response data.

Once the response data is obtained, the server renders an EJS template (`template9`) and passes the data as a 
*! variable (`data`). Finally, the server sends the rendered template as the response back to the browser, which 
*! can then display the requested page with the data.

In summary, `app.get` is used to handle the GET request sent by the browser to a specific endpoint on the server. 
*? The server can perform additional operations, such as making requests to external APIs, processing data, or 
*? rendering templates, and then send the response back to the browser.
===================================================================================================================
*/

/**
*? When you submit a form using a POST request, the browser sends the form data to the server in the request body. 
*? The form data is encoded as key-value pairs, where the keys are the name attributes of the form fields and the 
*? values are their corresponding values.

*! In your example, you have an <input> element with a name attribute of "input". When you submit the form, the 
browser will send a POST request to the server with the form data in the request body. The form data will include a 
key-value pair with the key "input" and the value equal to the current value of the <input> element.

*? On the server-side, you can use the body-parser middleware to parse the request body and make it available in the 
req.body object. The req.body object will contain properties for each key-value pair in the submitted form data. 
In your case, it will have an input property with a value equal to the current value of the <input> element.

*! In your code, you are accessing this value using const input = req.body.input. This statement gets the value of 
*! the input property of the req.body object and stores it in a variable named input. This variable is then passed to 
your EJS template as a property of the data object when you call res.render('template9', {data: data, input: input})
*/

/**
*? In the code you provided, the axios.request(options) call inside the app.get route handler is used to retrieve 
*? data from the https://v1.baseball.api-sports.io/leagues API endpoint when the user first visits the page. This 
*? data is then passed to the template9 EJS template and rendered on the page.

*!The reason for calling axios.request(options) inside the app.get route handler is to retrieve data from the API 
*!endpoint and display it to the user when they first visit the page. This provides the user with some initial data 
*!to view before they submit the form.

*?When the user submits the form, a POST request is sent to the server and handled by the app.post route handler. 
Inside this route handler, another axios.request(options) call is made to retrieve fresh data from the API endpoint.
*!This data is then passed to the template9 EJS template along with the value of the input field from the submitted 
form data and rendered on the page.
*/

/** 
*? body-parser is a middleware module for Express.js that extracts the entire body portion of an incoming request 
stream and exposes it on req.body. The extracted data can be in any format like JSON, text, URL-encoded form data.

The line app.use(bodyParser.urlencoded({extended: true})); is using the urlencoded middleware of body-parser. This
middleware parses URL-encoded data (sent by HTML forms) and exposes it on req.body. The extended option allows for 
choosing between parsing the URL-encoded data with the querystring library (when false) or the qs library (when 
true). The default value is true, so if you don’t provide this option, it will use the qs library.

*! Q)so everytime there is input in a webpage from the user , body-parser is used ? or if the ejs template has a 
*! body then body-parser is used where it extracts the entire information of the body of that template ?
*? body-parser is used to extract the data sent in the body of an HTTP request. It is not specific to any particular
*? template engine like EJS or any particular type of input on a webpage. Whenever an HTTP request is sent to the 
*? server with data in its body (such as a form submission), body-parser can be used to extract that data and make it 
*? available on the req.body object for further processing by the server.

So, if you have a form on your webpage that sends data to your server when submitted, you can use body-parser to 
extract that data on the server-side. Similarly, if you send an AJAX request with data in its body, you can use 
body-parser to extract that data on the server-side.
*/

/**
Q)req.body contains body of the entire ejs template ?
*? Ans)No, req.body does not contain the body of the entire EJS template. req.body contains the parsed data from 
*? the body of an incoming HTTP request. This data is sent by the client (e.g. a web browser) to the server when 
*? making the request.

*! Q)What is the meaning of parsed data ?
Ans)Parsed data refers to data that has been processed and transformed from its original format (e.g. a string of 
text) into a more structured format (e.g. a JavaScript object) that can be more easily accessed and manipulated by 
the program.
For example, when data is sent in the body of an HTTP request, it is often sent as a string in a specific format 
such as JSON or URL-encoded form data. body-parser takes this string of data and parses it (i.e. processes and 
transforms it) into a JavaScript object that can be accessed and manipulated more easily by the server-side code. 
This parsed data is then made available on the req.body object.

*! Q)When does this code detect that the ejs template has a submit button and that data must be fetched when that 
*! button is clicked?
*? This code does not directly detect when a submit button in an EJS template is clicked. Instead, it defines two 
routes: a GET route for the '/' path and a POST route for the '/' path.
*? If the rendered EJS template contains a form with a submit button and its method attribute is set to "POST", then 
clicking that button will cause the browser to send a POST request to the server with the data from the form. This 
triggers the app.post('/', ...) route, which extracts the data from the form (using body-parser), makes another API 
request using axios, retrieves some more data, and then renders the same EJS template again with both the new data
and the data from the form.
*/