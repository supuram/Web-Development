const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://v1.baseball.api-sports.io/leagues',
  headers: {
    'x-rapidapi-key': '03751dc23ed8813648f541bee3d317bb'
  }
}

axios.request(options).then(response => { 
  console.log(response.data);
}).catch(error => {
  console.error(error);
})

/*
axios.request(options).then(response => { 
  console.log(response.data);
}).catch(error => {
  console.error(error);
})

This code snippet shows an example of using the Axios library to make an HTTP request to the server specified in the
options object. The axios.request() method is used to make the request, passing in an options object that specifies 
the details of the request, such as the method, URL, and headers.
The then() method is used to specify a callback function that will be called when the request is completed. The 
callback function takes a single argument, response, which contains the response data returned by the server.
In this example, the callback function simply logs the response data to the console using console.log(response.data).
*/

/*
The statement const axios = require('axios'); is used to import the Axios library into a Node.js script. Axios is a 
popular JavaScript library for making HTTP requests. It provides a simple and easy-to-use API for making requests 
to servers and retrieving data.
In this statement, the require function is used to load the Axios module and assign it to a variable named axios. 
Once the module is loaded, you can use the axios variable to access the methods and properties provided by the 
Axios library.

The options object specifies that a GET request should be made to the https://v1.baseball.api-sports.io/leagues URL. 
The headers property of the object specifies that an x-rapidapi-key header should be included in the request with a 
value of '03751dc23ed8813648f541bee3d317bb'. This header is used to authenticate your requests to the API using your
RapidAPI key.
When you pass this options object to the axios.request method (or one of the shorthand methods like axios.get), 
Axios will use the information in the object to make a GET request to the specified URL with the specified headers. 
If the request is successful, you should receive a response from the API containing data about baseball leagues.

The headers object in the code you provided contains a property called x-rapidapi-key with a value of '03751dc23ed8
813648f541bee3d317bb'. This is likely an API key used to authenticate the request to the API. An API key is a code 
that is passed in by the client to identify the calling program, its developer, or its user to the website. It is 
used to track and control how the API is being used, for example to prevent malicious use or abuse of the API.
To authenticate a request to an API means to verify the identity of the client making the request. This is typically
done by providing some form of credentials, such as an API key or a username and password, that the API can use to 
verify that the client is authorized to access the data or functionality provided by the API.

You cannot change the name of the x-rapidapi-key header. This header name is specified by the API provider (in this 
case, RapidAPI) and is used to authenticate your requests to the API. If you change the name of this header, your 
requests will not be authenticated and you will not be able to access the data from the API.

It’s important to use the correct property names when defining the options object for an Axios request. The method, 
url, and headers properties are all recognized by Axios and should be used with their correct names to specify the 
details of the request. If you use different property names, Axios will not recognize them and will not be able to 
use them to configure the request.
*/

/*
The technology behind generating an API key can vary depending on the specific implementation, but it typically 
involves generating a unique, random string of characters that can be used to identify the client making the request.

The specific code used to generate a unique, random string of characters for an API key can vary depending on the 
programming language and the specific requirements of the API provider. However, many programming languages have 
built-in functions or libraries that can be used to generate random strings of characters.
For example, in JavaScript, one could use the crypto module to generate a random string of characters for an API 
key - const crypto = require('crypto');
const apiKey = crypto.randomBytes(20).toString('hex');

API providers typically use a database or some other form of data storage to keep track of the clients and their 
associated API keys. When a client registers with the API provider and is issued an API key, the API provider will 
store the API key along with information about the client, such as their name, email address, and other relevant 
details.
When the client makes a request to the API using their API key, the API provider can look up the API key in their 
database to verify that it is valid and associated with a registered client. The API provider can then use the 
information stored in the database to track and monitor how the client is using the API, for example to enforce 
usage limits or to detect and prevent abuse.
The specific technology used to implement this can vary depending on the specific requirements of the API provider 
and their infrastructure. Some common technologies used for data storage include relational databases, NoSQL 
databases, and cloud-based storage solutions.

Tracking -
Once the API provider has verified the API key and identified the client making the request, they can use various 
technologies and methods to track and monitor the client’s usage of the API. This can include logging the client’s 
requests and responses, monitoring usage patterns and trends, and enforcing usage limits or quotas.
The specific technology used to implement this tracking and monitoring can vary depending on the specific 
requirements of the API provider and their infrastructure. Some common technologies used for this purpose include 
logging frameworks, analytics platforms, and monitoring tools.
While a database is typically used to store information about the clients and their associated API keys, it can 
also be used to store information about the client’s usage of the API. For example, the API provider could log each 
request made by the client along with information such as the timestamp, endpoint accessed, and response status. 
This information could then be stored in a database and analyzed to track and monitor the client’s usage of the API.
*/