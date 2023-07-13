import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // username and password is being sent to the server side where it is extracted using req.body
      });

      const data = await response.json();  // See line 212-233. response which comes from app.post is stored in data

      if (response.ok) {
        setToken(data.token);
        setMessage('Registration successful!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setMessage('Login successful!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProtected = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/protected', {
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Authentication Example</h1>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Protected Route</h2>
        {token ? (
          <button onClick={handleProtected}>Access Protected Route</button>
        ) : (
          <p>Login to access the protected route</p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
export default App;

/**
*! Q)const response = await fetch('http://localhost:5000/api/register', - What does this line do ?
Ans)This line of code uses the fetch function to make a request to the /api/register route on the server running at 
*? http://localhost:5000. The await keyword is used to wait for the response from the server before proceeding with 
the rest of the code.

The fetch function returns a Promise that resolves with a Response object representing the response from the server.
*? In this case, the Response object is assigned to the response variable using the await keyword.

This line of code is typically used in the client-side code to send a registration request to the server. The 
*? request can include additional data, such as the username and password entered by the user, which can be sent to 
*? the server as part of the request body.

*! Q)So fetch requests the server and who receives the message on the server side ?
Ans)Yes, the fetch function is used to send a request from the client-side code to the server. On the server side, 
*? the request is received and handled by the appropriate route handler, which is defined using methods like app.get, 
*? app.post, app.put, and app.delete.

In the case of the line of code you provided, the fetch function is making a request to the /api/register route 
*? using the POST method. On the server side, this request would be received and handled by the route handler 
*? defined using app.post('/api/register', ...). This route handler is responsible for processing the registration 
request and sending a response back to the client-side code. 

*! Q)But app.get sends a GET request to the server to retrieve the requested page and app.post is used to send data 
*! to a server. so if fetch is sending a request to the server , how can app.get and app.post receive them as both 
*! app.post and app.get can be used on client side too ?
Ans)`app.get` and `app.post` are methods of the Express `app` object, which is used to create a server-side 
*? application. These methods are used to define route handlers for `GET` and `POST` requests, respectively, on 
*? the server side.

On the client side, you can use functions like `fetch` or libraries like Axios to send `GET`, `POST`, and other 
*? types of HTTP requests to the server. When the server receives a request, it uses the route handlers defined 
with `app.get`, `app.post`, and other methods to determine how to handle the request.

*TODO For example, if the client-side code sends a `GET` request to the `/api/users` route using the `fetch` 
*? function, the server would receive this request and use the route handler defined with `app.get('/api/users', ...)`
to handle it. Similarly, if the client-side code sends a `POST` request to the `/api/register` route using the 
`fetch` function, the server would receive this request and use the route handler defined with `app.post('/api/regis
ter', ...)` to handle it.

In summary, `app.get`, `app.post`, and other methods of the Express `app` object are used on the server side to 
define route handlers for different types of HTTP requests. On the client side, you can use functions like `fetch` 
*TODO or libraries like Axios to send these requests to the server. 

*? `app.get` and `app.post` are used on the server-side to handle GET and POST requests, respectively. These 
*? methods are part of the Express framework, which allows you to define routes and handle incoming requests on the 
server.

*! On the client-side, when making HTTP requests to the server, you typically use the `fetch` API or other similar 
*? libraries (e.g., Axios) to send requests to specific endpoints on the server.

The `fetch` function in JavaScript is used to send HTTP requests from the client-side to the server. It allows you 
to make GET, POST, PUT, DELETE, and other types of requests to interact with the server's endpoints.

To clarify, `app.get` and `app.post` are server-side functions that define the routes and specify the behavior when 
*? the server receives a GET or POST request at a particular endpoint. These routes are defined on the server using 
the Express framework.

On the client-side, you can use `fetch` to send GET or POST requests to the server's defined endpoints. The server's
`app.get` or `app.post` route handlers will then execute the specified logic to handle these requests and send the 
*? appropriate response back to the client.

*? In summary, `app.get` and `app.post` are used on the server-side to define routes, while `fetch` is used on the 
*? client-side to send HTTP requests to those routes on the server.

*! Q)Who brings the response from the server side ? Is it the functions inside app.get ?
Ans)The response from the server is generated by the route handler that is responsible for handling the request. In
the case of the line of code you provided, the `fetch` function is making a `POST` request to the `/api/register` 
route on the server running at `http://localhost:5000`. On the server side, this request would be received and 
handled by the route handler defined using `app.post('/api/register', ...)`. This route handler is a function that 
takes two arguments: `req`, representing the incoming request, and `res`, representing the response that will be 
sent back to the client.

Inside this route handler function, you can use the `req` object to access data from the incoming request, such as 
the request body or query parameters. You can also use the `res` object to generate a response and send it back to 
the client. For example, you can use methods like `res.json` or `res.send` to send data back to the client in the 
response.

In summary, when you use the `fetch` function to make a request to the server, the response is generated by the 
appropriate route handler on the server side. This route handler is a function that you define using methods like 
`app.get`, `app.post`, and others, depending on the type of request you want to handle. 

*! Q)So whatever app.post returns will be inside the response object ?
*? Ans)Not exactly. The `app.post` method itself does not return anything. Instead, it is used to define a route 
handler function that will be called when the server receives a `POST` request to the specified route.

Inside this route handler function, you can use the `res` object to generate a response and send it back to the 
client. For example, you can use methods like `res.json` or `res.send` to send data back to the client in the 
*? response. The data that you send back to the client using these methods will be included in the `Response` 
*? object that is returned by the `fetch` function on the client side.

Here's an example to illustrate this:

*? // Server-side code
app.post('/api/register', (req, res) => {
  // ... handle the registration request ...

  // Send a response back to the client
  res.json({ message: 'Registration successful' });
});

*? // Client-side code
const response = await fetch('http://localhost:5000/api/register', {
  method: 'POST',
  // ... include request body and other options ...
});
const data = await response.json();
*? console.log(data); // { message: 'Registration successful' }

In this example, the client-side code uses the `fetch` function to send a `POST` request to the `/api/register` 
route on the server. On the server side, this request is received and handled by the route handler defined using `
*? app.post('/api/register', ...)`. Inside this route handler function, we use the `res.json` method to send a JSON 
response back to the client, containing a message indicating that the registration was successful.

*? On the client side, we use the `response.json` method to extract the data from the response. This data is then 
logged to the console, where we can see that it contains the message that was sent from the server. 

*! Q)So app.post() is not a route handler function?
Ans)`app.post()` is a method of the Express `app` object that is used to define a route handler function for 
*? `POST` requests. When you call `app.post()` with a route and a callback function as arguments, you are defining 
*? a route handler function that will be called whenever the server receives a `POST` request to the specified 
route.

Here's an example:

app.post('/api/register', (req, res) => {
  // ... handle the registration request ...
});

In this example, we're calling the `app.post()` method with two arguments: the route `'/api/register'` and a 
*! callback function. This callback function is the route handler function that will be called whenever the server 
*? receives a `POST` request to the `/api/register` route. Inside this function, we can access the incoming request 
*? using the `req` object and generate a response using the `res` object.

*? In summary, `app.post()` is a method that is used to define a route handler function for `POST` requests. The 
callback function that you pass as the second argument to `app.post()` is the actual route handler function that 
will be called when the server receives a matching request. 
-----------------------------------------------------------------------------------------------------------------
*! Q)What is the meaning of 
*! headers: {
*!  'Content-Type': 'application/json',
*! }
Ans)The `headers` option in the `fetch` function is used to specify custom HTTP headers to include in the request. 
In the code you provided, the `headers` option is used to set the value of the `Content-Type` header to 
`'application/json'`.

The `Content-Type` header is used to indicate the media type of the request body. In this case, by setting the 
value of the `Content-Type` header to `'application/json'`, we're indicating that the request body contains data 
in JSON format.

This information is important for the server, as it tells the server how to parse the request body. When the server 
receives a request with a `Content-Type` header set to `'application/json'`, it knows that it needs to parse the 
request body as JSON data.

Here's an example of how this can be done on the server side using Express:

app.use(express.json()); // Parse incoming request bodies as JSON
app.post('/api/register', (req, res) => {
  const { username, password } = req.body; // Extract data from the request body
  // ... handle the registration request ...
});

In this example, we use the `express.json()` middleware to parse incoming request bodies as JSON data. This 
middleware is called automatically for every incoming request and parses the request body if the `Content-Type` 
header is set to `'application/json'`. The parsed data is then available on the `req.body` object, which we can 
use to extract data from the request body and handle the registration request. 

*! Q)So application /json is already predefined ?
Ans)Yes, `'application/json'` is a predefined media type that is used to indicate that the data being sent in the 
request body is in JSON format. It is one of many standard media types defined by the [Internet Assigned Numbers 
Authority (IANA)](https://www.iana.org/assignments/media-types/media-types.xhtml).

When you set the value of the `Content-Type` header to `'application/json'`, you're telling the server that the 
data in the request body is in JSON format and should be parsed accordingly. On the server side, you can use 
middleware like `express.json()` to automatically parse incoming request bodies as JSON data if the `Content-Type` 
header is set to `'application/json'`.

In summary, `'application/json'` is a predefined media type that is used to indicate that the data being sent in 
the request body is in JSON format. You can use this media type by setting the value of the `Content-Type` header 
to `'application/json'` when sending a request from the client-side code. 
*/