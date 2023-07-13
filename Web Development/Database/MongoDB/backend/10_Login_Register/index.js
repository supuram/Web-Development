import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import uri from './first.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import session from 'express-session'

const client = new MongoClient(uri)
const app = express()
app.use(cors())
app.use(express.json())
const jwtSecret = 'your-secret-key'

async function startServer() {
    try {
        await client.connect()
        const db = client.db('store')
        const collection = db.collection('user_registration_information')

        app.get('/', (req, res) => {
            const data = { showHome: true }
            res.json(data)
        })
        
        app.use(session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false
        }));

        app.get('/logout', (req, res) => {
            // Perform any necessary operations for logout
            // For example, you can clear the user's session or delete the associated token
            // Assuming you're using Express-session for managing sessions
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error occurred during logout');
                } 
                else {
                    res.clearCookie('authToken');
                    res.redirect('/')
                }
            });
        });
  

        // Verifies the JWT and authenticates the user
        app.get('/protected-route', (req, res) => {
            // Get JWT from Authorization header
            const authHeader = req.headers.authorization
            const token = authHeader && authHeader.split(' ')[1]
        
            if (!token) {
                // No JWT provided
                res.status(401).send('Unauthorized')
                return
            }
        
            try {
                // Verify JWT
                const decoded = jwt.verify(token, jwtSecret)
        
                // Authentication successful
                res.status(200).send('Protected data')
            } catch (error) {
                // Invalid JWT
                res.status(403).send('Forbidden')
            }
        })        

        // For the form inside About.js on the client side
        app.post('/submit-form', async (req, res) => {
            try {
                await collection.insertOne(req.body)
                res.status(200).send('Form data saved')
            } catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        // For the form inside Register_Page.js on the client side
        app.post('/Register-Page-Form', async (req, res) => {
            const {text, email, password} = req.body
            try {
                let userExist = await collection.findOne({email})
                if(userExist){
                    res.status(200).send({ message : 'This email already exists. Please Login'})
                }
                else{
                    const hashedPassword = await bcrypt.hash(password, 10); 
                    const user = {
                        username: text,
                        email: email,
                        password: hashedPassword,
                    };
                    await collection.insertOne(user)
                    res.status(200).send({ message : 'User registered successfully. Please Login'})
                }
            } 
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        // For the form inside Login_Page.js on the client side 
        app.post('/Login-Page-Form', async (req, res) => {
            const {email, password} = req.body
            try {
                let userExist = await collection.findOne({email}) // returns the entire document and so userExist contains both email and password
                if(userExist){
                    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
                    if(isPasswordMatch){
                        const token = jwt.sign({email}, jwtSecret, {expiresIn: '10h'})
                        res.status(200).send({token})
                        return
                    }
                }
                else{
                    res.redirect('/')
                    return
                }
                
            } 
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        app.listen(5000, () => {
            console.log('App is running')
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()

/**
*! Q)const app = express()
*! What is the meaning of this line ?
Ans)The line `const app = express()` creates an instance of the Express application.

In Node.js with Express, the `express()` function is used to create an Express application. The `app` variable 
holds the created instance, which can be used to define routes, middleware, and other functionalities for your web 
application.

By calling `express()`, you are initializing an instance of the Express application, which provides a set of 
methods and properties to handle HTTP requests, define routes, and configure middleware.

For example, you can use `app.get()` to define a route for handling GET requests, `app.post()` for handling POST 
requests, and so on. You can also use `app.use()` to add middleware functions that execute for every request, such 
as body parsers, authentication, or error handling.

By assigning the `express()` function to the `app` variable, you have a reference to the Express application 
instance, allowing you to configure and define the behavior of your web application using the various methods and 
properties provided by Express.

*! Q)So app is an object which points towards the prototype of express () ?
Ans)Yes, that's correct. In JavaScript, when you create an instance of an object using a constructor function like 
`express()`, the created instance inherits properties and methods from the prototype of that constructor function.

In the case of Express, the `express()` function is a top-level function exported by the Express module. When you 
call `express()`, it internally creates an instance of an Express application by invoking the `createApplication` 
function. This instance is an object that inherits properties and methods from the prototype of `createApplication`,
which is the prototype of the `express()` function.

By assigning the result of `express()` to the `app` variable, you have a reference to that Express application 
object. You can then use `app` to access the inherited properties and methods defined on the prototype, such as 
`app.get()`, `app.post()`, `app.use()`, and more.

So, in summary, `app` is an object that points to an instance of an Express application, and it inherits properties 
and methods from the prototype of the `express()` function.

*! Q)What is the meaning of app.use(cors()) ?
Ans)The line `app.use(cors())` in Express adds the CORS (Cross-Origin Resource Sharing) middleware to your 
application.

CORS is a mechanism that allows servers to specify who can access their resources on a web page, based on the 
origin of the request. It is a security feature implemented by web browsers to protect against cross-origin 
requests that could be malicious.

When you use `app.use(cors())`, you are adding the CORS middleware to your Express application. This middleware 
automatically adds the necessary HTTP headers to the server's responses to allow cross-origin requests from clients.

By default, `app.use(cors())` enables CORS for all routes in your application. It sets the necessary headers to 
allow requests from any origin, with any method (GET, POST, etc.), and with any headers.

Enabling CORS is important when your application needs to interact with resources (APIs, assets, or data) on a 
different domain or port. Without CORS, the browser's security mechanisms prevent JavaScript code running in a web 
page from making requests to different origins.

By adding `app.use(cors())`, you ensure that your Express application responds to cross-origin requests 
appropriately and allows clients to access the server's resources from different origins.

*! Q)What is the meaning of - app.use(express.json())
Ans)The line `app.use(express.json())` in Express adds middleware to your application to parse JSON-encoded bodies 
in incoming requests.

In modern web development, it is common to send and receive data in JSON format. When a client makes a request to 
your Express server with a JSON payload in the request body, the `express.json()` middleware is responsible for 
parsing that JSON data and making it available in the `req.body` property of the request object.

By using `app.use(express.json())`, you are instructing your Express application to use the `express.json()`
middleware for all incoming requests. This middleware parses the request body as JSON if the `Content-Type` 
header of the request is set to `application/json`.

Once the JSON data is parsed, it is available in the `req.body` property, allowing you to access and work with 
the data within your route handlers.

For example, if a client sends a POST request with JSON data in the request body, you can access that data in your 
route handler like this:

app.post('/example', (req, res) => {
  const data = req.body;
  // Process the received JSON data
});

The `express.json()` middleware plays an important role in handling JSON data in your Express application, 
allowing you to easily work with JSON payloads sent by clients.

*! Q)Axios.post('/Login-Page-Form', {email, password}) - But in my client side i have used this type and here 
*! nowhere application/json is written. so now how is the incoming request parsed ?
Ans)In the code you provided, the client-side code sends a POST request to the `/Login-Page-Form` endpoint using 
Axios. The request payload is an object containing `email` and `password`.

The absence of explicitly setting the `Content-Type` header to `application/json` in the client-side code doesn't 
prevent the server from properly parsing the incoming request.

*? When you use `Axios.post()` to send the request, Axios automatically sets the `Content-Type` header to 
*? `application/json` by default. This informs the server that the request body is JSON data.

On the server-side, the line `app.use(express.json())` adds middleware to your Express application that 
specifically handles JSON-encoded request bodies. This middleware is responsible for parsing the JSON data in the 
incoming request and populating the `req.body` object with the parsed JSON data.

Therefore, even if you didn't explicitly set the `Content-Type` header in your client-side code, Axios sets it to 
`application/json` by default, and the `express.json()` middleware in your server-side code correctly parses the 
incoming JSON request body.

*! Q)If i only wrote express.json() instead of app.use(express.json()) what will happen? What is the meaning of 
*! only express.json()?
Ans)Writing `express.json()` alone without using it as middleware (`app.use(express.json())`) won't have any effect 
in your Express application. 

In Express, `express.json()` is a middleware function that parses the JSON-encoded request body. However, to use 
middleware in Express, you need to explicitly register it using `app.use()` or specify it for specific routes.

*? The purpose of `app.use(express.json())` is to add the `express.json()` middleware to your application's 
*? middleware stack, which ensures that all incoming requests pass through it and have their JSON bodies parsed.

On the other hand, if you only write `express.json()` without `app.use()`, it won't be registered as middleware, 
and the incoming requests won't go through it for JSON parsing. This means that the `req.body` object won't be 
populated with the parsed JSON data, and you won't be able to access it within your route handlers.

Therefore, it is important to use `app.use(express.json())` to properly register the `express.json()` middleware 
and enable JSON body parsing for your Express application.

*! Q)
*! app.get('/', (req, res) => {
*!    const data = { showHome: true }
*!    res.json(data)
*! })
*! What does this two lines mean - const data = { showHome: true }, res.json(data) ?
Ans)In the code snippet you provided, these two lines handle a GET request to the root URL ("/") of your Express 
application.

1. `const data = { showHome: true }`: This line creates a JavaScript object called `data` with a single property 
`showHome` set to `true`. This object can be used to hold any data you want to send back as the response.

2. `res.json(data)`: This line sends a JSON response back to the client. It takes the `data` object and converts it 
to JSON format. The resulting JSON data is then sent as the response body.

When a client makes a GET request to the root URL ("/") of your application, this code will execute. It creates a 
`data` object with the `showHome` property set to `true`, indicating that the client should display the home page. 
Then, it sends the `data` object as a JSON response back to the client.

The response will have a JSON content type and a body containing the JSON data `{ "showHome": true }`. The client 
can then process this JSON data according to its requirements.
*? ----------------------------------------------------------------------------------------------------------------

*! Q)app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
*! Explain each and every line of this code.
Ans)The code you provided configures and uses the `express-session` middleware in an Express application. 
Let's break down each line:

1. `app.use(session({ ... }))`: This line adds the `express-session` middleware to your Express application. The 
`app.use()` function is used to register middleware in Express. In this case, it registers the `express-session` 
middleware.

2. `secret: 'your-secret-key'`: The `secret` option is a required configuration for `express-session`. It is a 
string used to sign and encrypt the session ID cookie. You should replace `'your-secret-key'` with a unique and 
secure secret key.

3. `resave: false`: The `resave` option is an optional configuration for `express-session`. When set to `false`, 
it indicates that the session should not be saved to the session store on every request where no changes have been 
made to the session. This helps to optimize performance by reducing unnecessary session writes.

4. `saveUninitialized: false`: The `saveUninitialized` option is an optional configuration for `express-session`. 
When set to `false`, it indicates that the session should not be saved to the session store if it is empty (no data 
has been added to the session). This helps to save storage space and improves performance by avoiding unnecessary 
session creation.

By using `app.use(session({ ... }))`, you are enabling session management in your Express application. The `express-
session` middleware handles session-related operations, such as creating a session, storing session data, and 
managing session cookies. It allows you to store and retrieve user-specific data across multiple requests, 
providing a way to maintain state and user sessions in your application.

*! Q)In this below code which is my sessionID cookie ? Or will it be auto generated by the browser once a user is 
*! logged in ?
Ans)In the code you provided, the session ID cookie is automatically generated and managed by the `express-session` 
middleware. The session ID cookie is essential for identifying and associating a user's session data on the server.

When you use `app.use(session({ ... }))`, the `express-session` middleware takes care of creating and managing the 
session ID cookie. It automatically generates a unique session ID for each user session and stores it as a cookie 
in the user's browser. The name of the session ID cookie is typically "connect.sid" by default.

The session ID cookie is sent back and forth between the client and server with each request and response, allowing 
the server to identify and retrieve the corresponding session data stored on the server. The `express-session` 
middleware handles this process internally.

In summary, the session ID cookie is automatically generated and managed by the `express-session` middleware, and 
you don't need to explicitly create or manage it in your code.

*! Q)In this code snippet - app.use(session({ secret: 'your-secret-key'....) you said you should replace `'your-
*! secret-key'` with a unique and secure secret key. Where do i find this unique and secure secret key ? Is it 
*! jwt token which i defined later in const token = jwt.sign({email}, jwtSecret, {expiresIn: '10h'}) ?
Ans)The secret key used in `express-session` and the JWT secret key are different and serve different purposes.

For `express-session`, the secret key is used for signing the session ID cookie and should be a long, random, and 
unique string. It is used to prevent tampering and ensure the integrity of the session data. You should generate 
your own secret key and keep it secure. It is not related to the JWT secret key.

For the JWT secret key (`jwtSecret` in your code), it is used for signing and verifying the JWT token. This key 
is used to ensure the authenticity and integrity of the token. The JWT secret key should also be a long, random, 
and unique string. It is used for cryptographic operations related to JWTs and should be kept secure.

In summary, the secret key for `express-session` and the JWT secret key serve different purposes and should be 
separate and unique. You can generate random secret keys using a secure random string generator or use a library/
tool that provides secure key generation. Make sure to keep the secret keys confidential and avoid hardcoding them 
in your code.

*! Q)So const jwtSecret = 'your-secret-key' and app.use(session({secret: 'your-secret-key', resave: false,
*! saveUninitialized: false})); Both jwtSecret and secret have the same value of 'your-secret-key'. So are both 
*! jwtSecret and secret same and does the same task ?
Ans)In the code snippet you provided, `jwtSecret` and `secret` are used for different purposes.

The `jwtSecret` is used as a secret key for signing and verifying JSON Web Tokens (JWTs). It is used in the 
*? `jwt.sign()` function to sign the token with the server's secret key and in the `jwt.verify()` function to verify 
the token's signature.

*? On the other hand, `secret` is used as a configuration option for the `express-session` middleware. It is used to 
*? configure the session middleware's secret key, which is used to sign the session cookie. This secret key is used 
to encrypt and decrypt the session data stored on the server.

While both `jwtSecret` and `secret` may have the same value of `'your-secret-key'` in your example, they serve 
different purposes. `jwtSecret` is specifically used for JWT operations, while `secret` is used for session 
management with `express-session`. They are not the same and do not perform the same tasks.

It's important to use separate secret keys for JWT operations and session management to maintain proper security 
and separation of concerns.

*! Q)So 'your-secret-key' inside jwtSecret is actually the server's secret key or what is the server's secret key 
*! in jwt.sign({email}, jwtSecret, {expiresIn: '10h'})
Ans)In the code snippet `jwtSecret` is set to the value `'your-secret-key'`. The value `'your-secret-key'` is a 
placeholder and should be replaced with a unique and secure secret key specific to your server.

The server's secret key is a sensitive piece of information that should be kept confidential and known only to the 
server. It is used to sign the JWTs and verify their authenticity. The secret key ensures that only the server with 
the knowledge of the secret key can create and validate the tokens.

It's important to generate a strong and unique secret key for your server. A secure secret key should be long, 
random, and kept secret. You can generate a random secret key using cryptographic libraries or tools specific to 
your programming language or framework. Storing the secret key securely is crucial to maintain the integrity and 
security of your JWT-based authentication system.

*! Q)So inside jwtSecret we have the server's secret key and this key can be used to sign the token as well as 
*! verify the token's signature ?
Ans)Yes, that's correct. The `jwtSecret` variable holds the server's secret key, which is used both to sign the 
token during token creation and to verify the token's signature during token validation.

When creating a token with `jwt.sign({ email }, jwtSecret, { expiresIn: '10h' })`, the server uses the secret key 
(`jwtSecret`) to digitally sign the token, ensuring its authenticity and integrity. This signed token can be shared 
with the client.

During token verification with `jwt.verify(token, jwtSecret)`, the server uses the same secret key (`jwtSecret`) to 
verify the token's signature. If the signature is valid, it confirms that the token has not been tampered with and 
was indeed signed by the server.

The server's secret key acts as a shared secret between the server and the clients to ensure the trust and security 
of the tokens. It is essential to keep the secret key confidential and secure to prevent unauthorized access and 
tampering with the tokens.

*! Q)The `jwtSecret` variable holds the server's secret key. how do i generate this server's secret key ? Or will 
*! it be auto-generated ? Or can i put any string as i wish as the server's secret key ? Or is session ID cookie 
*! same as server's secret key ?
Ans)The server's secret key, represented by the `jwtSecret` variable, is a value that you should choose and set 
yourself. It is not auto-generated and should be kept confidential.

You can choose any string value as the server's secret key, but it is recommended to use a strong, random, and 
unique string to enhance security. The secret key is used to sign and verify tokens, so its strength directly 
impacts the security of your token-based authentication system.

Here's an example of generating a random secret key using Node.js:

*? const crypto = require('crypto');
*? const jwtSecret = crypto.randomBytes(32).toString('hex');

In the above code, `crypto.randomBytes(32)` generates 32 random bytes, and `.toString('hex')` converts the bytes 
to a hexadecimal string representation. You can use this generated string as your server's secret key.

It's important to note that the session ID cookie and the server's secret key serve different purposes. The session 
ID cookie is generated by the session management middleware (e.g., `express-session`) to maintain session state on 
the client-side. It is used to identify and associate a client's session with server-side session data. On the 
other hand, the server's secret key is used for signing and verifying tokens in a token-based authentication 
system, ensuring the integrity and authenticity of the tokens.
*? ----------------------------------------------------------------------------------------------------------------

*! Q)app.get('/logout', (req, res) => {
*!        req.session.destroy((err) => {
*!            if (err) {
*!                console.log(err);
*!                res.status(500).send('Error occurred during logout');
*!            } 
*!            else {
*!                res.clearCookie('authToken');
*!                res.redirect('/')
*!            }
*!        });
*!    });
*! Explain each and every line of this code
Ans)Sure! Let's go through each line of the code:

1. `app.get('/logout', (req, res) => { ... })`: This code sets up a route handler for the HTTP GET request to 
"/logout". It defines a callback function that will be executed when this route is accessed.

2. `req.session.destroy((err) => { ... })`: This line destroys the session associated with the current request. It 
removes the session data and invalidates the session ID. The `destroy` method is provided by the `express-session` 
middleware.

3. `(err) => { ... }`: This is the callback function passed to `req.session.destroy`. It will be executed after the
session is destroyed. It takes an optional `err` parameter, which will hold any error that occurred during the 
session destruction process.

4. `if (err) { ... }`: This line checks if an error occurred during the session destruction process. If there is 
an error, it logs the error to the console and sends a 500 (Internal Server Error) response to the client.

5. `res.clearCookie('authToken');`: This line clears the "authToken" cookie. It removes the cookie from the client's
browser by setting its value to an empty string and its expiration date to a date in the past. This effectively 
deletes the cookie.

6. `res.redirect('/');`: This line redirects the client to the "/" route, which typically represents the homepage 
or the landing page of the application. After logout, the user will be redirected to this page.

In summary, this code handles the "/logout" route, destroys the session, clears the "authToken" cookie, and 
redirects the user to the homepage. It effectively logs out the user by removing their session and associated token.

*! Q)Axios.post('/Login-Page-Form', {email, password})
*!         .then(response => {
*!             if(response.data.token){
*!                 document.cookie = `authToken = ${response.data.token}
*! But in this code snippet, authToken is a token send from the server side and not a cookie. So why are you saying 
*! authToken as a cookie ? Cookies are created by express-session automatically. Or is cookie and token the same ?
Ans)You are correct, in the provided code snippet, the `authToken` is actually a token received from the server 
and not a cookie. I apologize for the confusion in my previous response.

In the code snippet, the `authToken` is assigned as a property of the `document.cookie`. This is a common approach 
to store the token in a cookie on the client-side for future use, as cookies can be automatically included in 
subsequent requests by the browser. It allows the server to authenticate the user based on the token present in 
the cookie.

However, it's important to note that cookies and tokens are not the same. Cookies are small pieces of data stored 
*? by the browser and sent along with each request to the server, while tokens are typically generated by the server 
*? and used for authentication purposes.

To clarify, in the provided code, the `authToken` is stored as a cookie on the client-side, and it can be accessed 
by the server in subsequent requests to authenticate the user.

*! Q)so in req.session.destroy , we are effectively destroying authToken inside which a token is stored but it 
*! behaves like a cookie ? So here the token behaves like a cookie or the token is wrapped inside a cookie and 
*! that wrapper acts like a cookie and when that wrapper is destroyed, automatically the token inside is also 
*! destroyed ?
Ans)In the code snippet you provided, `req.session.destroy` destroys the session associated with the user. The 
session data, including any tokens or other information stored within the session, is destroyed as a result.

In the case of using `express-session` middleware, the session data is typically stored on the server-side, and a 
session ID is sent to the client as a cookie. This session ID cookie acts as a reference to the server-side session 
data. The session ID is typically encrypted or signed to maintain its integrity and security.

When `req.session.destroy` is called, the session ID cookie is cleared from the client's browser, effectively 
invalidating the session. As a result, the server-side session data is destroyed, including any tokens or other 
information stored within the session.

To summarize, the token is not directly wrapped inside the cookie. Instead, the session ID cookie acts as a 
reference to the server-side session data, which may contain the token or other user-related information. When 
the session is destroyed, the session ID cookie is cleared, and the server-side session data, including the token, 
is effectively destroyed.

*! Q)What is the session ID cookie ? Who generates it ? How does the client intercepts it ? Show the code.
Ans)The session ID cookie is a cookie that contains the unique identifier for a session. It is generated by the 
server and sent to the client as part of the HTTP response. The client's browser automatically stores the cookie 
and includes it in subsequent requests to the server to associate the request with the correct session.

Here's an example of how you can generate and send a session ID cookie using the `express-session` middleware in 
Node.js:

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  // Access the session ID through req.sessionID
*?  const sessionId = req.sessionID;

  // Set the session ID as a cookie
*?  res.cookie('sessionId', sessionId, { httpOnly: true });

  // Send a response
*?  res.send('Session ID cookie has been set');
});

app.listen(3000, () => {
  console.log('App is running');
});

In the above example, the `express-session` middleware is used to handle sessions. When a request is made to the 
root route `/`, the server accesses the session ID through `req.sessionID`. It then sets the session ID as a cookie 
named "sessionId" using `res.cookie`. The `httpOnly: true` option ensures that the cookie is accessible only 
through HTTP requests and not JavaScript code running in the browser.

On the client side, the browser automatically stores the session ID cookie when it receives it from the server. 
The client doesn't need to intercept it manually as the browser handles the cookie management.

*! Q)But i have not used the code you showed in the previous question. So how is my sessionID generated. Or is it 
*! not needed in my code as i have used a token ?
Ans)In your code, you have used the `express-session` middleware, which automatically generates a session ID for 
each session. The session ID is stored on the server-side and is associated with the client's session.

The session ID is not directly exposed or managed by your code in the `/` route handler. Instead, it is handled by 
the `express-session` middleware internally. When a client makes a request, the middleware automatically generates 
a session ID for the client if one doesn't exist already. The session ID is then stored in the session object 
(`req.session`) provided by the middleware.

In your code, the session ID is not explicitly set as a cookie in the `/` route handler because `express-session` 
handles it internally. The middleware automatically sets a session ID cookie named "connect.sid" by default, which 
contains the session ID. The cookie is sent to the client in the response headers.

So, even though you haven't explicitly set the session ID as a cookie in your code, the `express-session` 
middleware takes care of generating and managing the session ID and associating it with the client's session 
through the session cookie.
*? ---------------------------------------------------------------------------------------------------------------

*! Q)const authHeader = req.headers.authorization; const token = authHeader && authHeader.split(' ')[1];
*! What does this two line do ?
Ans)These lines are used to extract the JWT (JSON Web Token) from the `Authorization` header of the HTTP request.

Here's how it works:
1. `req.headers.authorization`: This line retrieves the value of the `Authorization` header from the HTTP request 
headers. The `Authorization` header is commonly used to send authentication credentials, including JWTs.

2. `authHeader && authHeader.split(' ')[1]`: This line checks if `authHeader` exists and is truthy (not null or 
undefined). If it is, it splits the `authHeader` string into an array of substrings using the space character (' ') 
as the separator and retrieves the second element (index 1) of the resulting array. This assumes that the JWT is 
formatted as "Bearer token" in the `Authorization` header, where "token" is the JWT.

The purpose of these lines is to extract the JWT from the `Authorization` header so that it can be further used 
for verification and authentication purposes in the protected route.

Note: It's important to handle JWT authentication securely and follow best practices, including proper validation 
and error handling.

*! Q)"retrieves the value of the `Authorization` header from the HTTP request headers"- From where does it retrieves
*! the value of the 'Authorization' header ?
Ans)The value of the `Authorization` header is typically provided by the client making the HTTP request. When the 
client sends an HTTP request to the server, it includes various headers in the request, and one of those headers 
can be the `Authorization` header.

The client includes the `Authorization` header to provide authentication credentials, such as a token or a username 
and password, to the server. The specific value of the `Authorization` header depends on the authentication 
mechanism being used.

For example, when using JWT (JSON Web Tokens) for authentication, the client typically includes the token in the 
`Authorization` header using the Bearer token scheme. It would look something like this:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

The server can then retrieve the value of the `Authorization` header from the request headers and extract the token 
for further processing, such as token verification and authentication.

It's important to note that the client is responsible for including the `Authorization` header in the request, and 
the server retrieves its value from the request headers.

*! Q)So this is the Authorization header provided by the client - Authorization: `Bearer ${getCookie('authToken')}` ?
*! But the value of authToken is only found after the server sends the value of the token and the token is then 
*! stored in a cookie ?
Ans)Yes, you are correct. In the code snippet you provided, the value of the `Authorization` header is set using 
the value of the `authToken` cookie.

When the client sends a request to the server, it includes the `Authorization` header with the value `Bearer 
${getCookie('authToken')}`. The `getCookie('authToken')` function retrieves the value of the `authToken` cookie, 
which is previously set by the server in the response.

*? So, after the server sends the token value and it is stored in a cookie(document.cookie) on the client-side, 
*? subsequent requests from the client will include the token in the `Authorization` header, allowing the server 
*? to authenticate and authorize the request based on the token.

*! Q)What is the meaning of bearer token and why does authHeader.split(' ')[1] retrieves the second element only, 
*! why not first ?
Ans)The term "Bearer" in the context of authentication refers to a type of access token. It is a token-based 
authentication scheme where the client includes the access token in the `Authorization` header of the HTTP request 
to authenticate the request. The format of the `Authorization` header typically looks like this: `Bearer <access_
token>`. The word "Bearer" indicates the type of token being used.

In the code snippet `authHeader.split(' ')[1]`, `authHeader` refers to the value of the `Authorization` header. 
The `split(' ')` function is used to split the value into an array of strings based on the space character (' '), 
which separates the "Bearer" keyword and the actual token.

The `split(' ')` function returns an array of strings, and by accessing the element at index 1 (`[1]`), it retrieves
the second element of the array, which corresponds to the token value. In the case of `Bearer <access_token>`, the 
second element of the array will be the access token itself, without the "Bearer" keyword.

By extracting the token from the `Authorization` header, the server can then verify and validate the token to 
authenticate the request.

*! Q)if (!token) { res.status(401).send('Unauthorized')
*!        return  }
*! Here is the server sending to client ? Why again it has to return ? Already it is sending to the client ? So to 
*! whom it will return ?
Ans)In the code snippet you provided, the server is sending a response to the client using `res.status(401).send
('Unauthorized')`. The purpose of the `return` statement following this response is to exit the current function 
and prevent any further code execution.

The `return` statement ensures that the function execution stops at that point and does not continue to execute 
the remaining code. It is used to avoid any unintended behavior or errors that may occur if the function continues 
executing after sending the response.

In this case, when the server determines that no JWT (JSON Web Token) is provided, it sends a response with a 
status code of 401 (Unauthorized) and the message 'Unauthorized'. The `return` statement immediately exits the 
function, preventing any further execution of code that might be present after this block.

By using `return`, the server ensures that no additional code is executed after sending the response, and the 
function returns to the calling context (which could be the router, middleware, or any other part of the 
application flow).

*! Q)const decoded = jwt.verify(token, jwtSecret); In the above code what they are trying to verify, that whether 
*! token and jwtSecret are equal or not ? But jwtSecret = 'your-secret-key' and const token = jwt.sign({email}, 
*! jwtSecret, {expiresIn: '10h'}); res.status(200).send({token}); So both are different . What they are verifying ?
Ans)In the code snippet you provided, `jwt.verify(token, jwtSecret)` is used to verify the authenticity and 
integrity of the JWT (JSON Web Token) received from the client via Authorization: `Bearer ${getCookie('authToken')}`.

The `jwt.verify()` function takes two arguments: the token to be verified (`token`) and the secret key (`jwtSecret`). 
The secret key is used to verify the signature of the token and ensure that it hasn't been tampered with.

*? The `jwtSecret` used in `jwt.verify()` is not the same as the secret used in `jwt.sign()`. The `jwtSecret` is a 
*? shared secret known only to the server, whereas the secret used in `jwt.sign()` is used to sign the token and is 
*? known both to the server and the client.

During verification, the `jwt.verify()` function checks the token's signature, expiration, and any additional 
claims present in the token. If the token is valid and hasn't expired, the verification process succeeds, and the 
function returns the decoded payload (`decoded`).

In summary, the code is verifying the authenticity and integrity of the token by checking its signature using the 
`jwtSecret` shared secret key. It ensures that the token hasn't been tampered with and can be trusted.

























































































































 

*! Q)if(userExist){
*!     res.redirect('/')
*!     return
*! }
*! Why do we need to add return as , if userExist is true it will automatically go to '/'.

Ans)The return statement is necessary in this case because it stops the execution of the rest of the 
code in the handleSubmit function. Without the return statement, even after calling res.redirect('/'), 
the code after the if block would still be executed. This means that the new user data would still be 
inserted into the database, even if a user with the same username already exists.
By adding the return statement after calling res.redirect('/'), you ensure that if a user with the same 
username already exists, the function exits early and no new data is inserted into the database. This 
is important to prevent duplicate users from being created in your database.
*/









































































