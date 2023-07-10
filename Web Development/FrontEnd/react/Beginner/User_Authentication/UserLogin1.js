// server
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = require('./first.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Connect to MongoDB
let db;
let userLoginAndRegistration;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true, // used to enable the new MongoDB connection string parser. 
      useUnifiedTopology: true, // used to enable the new server discovery and monitoring engine
    });

    await client.connect();
    db = client.db('store');
    userLoginAndRegistration = db.collection('user_registration_information')
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();
/**
`app = express()` creates an instance of the Express application. The two lines you provided add middleware 
functions to the Express application using the `app.use()` method.

`app.use(cors())` adds the `cors` middleware to the application. This middleware enables Cross-Origin Resource 
Sharing (CORS)**, which allows your server to be accessed by other domains. It does this by responding to 
preflight requests, which are `OPTIONS` requests sent by the browser before the actual request, in order to 
determine which origins and request options the server accepts.

`app.use(express.json())` adds the `express.json()` middleware to the application. This middleware is responsible 
for parsing incoming JSON requests and populating the `req.body` property with the parsed data¹. This allows you to 
access the data sent in the request body as a JavaScript object.
*/
app.use(cors());
app.use(express.json());

// Function to retrieve user from the database by username
async function getUserByUsername(username) {
  return await userLoginAndRegistration('username').findOne({ username });
}

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' }); // or you can write res.status(400).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // There are several modern password hashing algorithms, such as Argon2, scrypt, and PBKDF2, that are designed to be computationally intensive while still providing good performance. 

    // Create a new user
    const user = {
      username,
      password: hashedPassword,
    };

    // Save the user to the database
    await userLoginAndRegistration.insertOne(user);

    // Generate a JWT token
    const token = jwt.sign({ username }, 'secretkey');

    res.status(200).json({ token });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    /**
    *! Q)Already password is matched here. why do we need to generate jwt token then ? Is it used to match the
    *! user on the client side ?
    Ans)A JWT token is generated after the password is successfully matched to provide a way for the server to 
    authenticate subsequent requests from the client without requiring the user to send their username and password 
    with every request.

    When the user logs in, their username and password are sent to the server and verified. If the login is 
    successful, the server generates a JWT token that contains information about the user, such as their username, 
    and sends this token back to the client. The client can then store this token, for example in local storage or
    a cookie, and include it in subsequent requests to protected routes on the server.

    On the server side, when a request is received with a valid JWT token in the Authorization header, the server 
    can verify the token and extract the user information from it. This allows the server to authenticate the user 
    and determine if they have permission to access the requested resource without requiring the user to send their 
    username and password again.

    In summary, generating a JWT token after a successful login provides a way for the server to authenticate 
    subsequent requests from the client without requiring the user to send their username and password with every 
    request. This improves security and makes it easier for users to interact with protected resources on the server. 
    */

    // Generate a JWT token
    const token = jwt.sign({ username }, 'secretkey');

    res.status(200).json({ token });  // sends to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Protected route
/**
* The /api/protected route is not called automatically whenever the user presses a key on the website. It is only 
*? called when the client-side code specifically makes a request to this route, which can happen after the user has 
*? successfully logged in and received a valid JWT token. The client-side code can then include this token in the 
*! Authorization header of the request to the /api/protected route to access it. This can happen, for example, when 
the user navigates to a protected page or performs an action that requires access to protected resources.
*/
app.get('/api/protected', (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const { username } = jwt.verify(token, 'secretkey');

    res.status(200).json({ message: `Welcome, ${username}! This is a protected route.` });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/**
*! Q)const token = jwt.sign({ username }, 'secretkey') - Meaning of this line 
Ans)The line you provided uses the `jwt.sign()` method from the `jsonwebtoken` library to create a JSON Web Token 
(JWT). The first argument passed to the `sign()` method is the payload of the token, which is an object containing 
the data you want to include in the token. In this case, the payload contains a single property, `username`, with 
the value of the `username` variable.

The second argument is the secret key used to sign the token. This key is used to create a digital signature that 
verifies the authenticity of the token. The secret key should be kept private and only known by the server that 
creates and verifies the tokens.

The resulting value assigned to the `token` variable is a string representing the signed JWT. This token can be 
sent to the client and used for authentication purposes.

The purpose of creating a JWT is to securely transmit information between parties. The information in a JWT is 
digitally signed using a secret key, which ensures that it has not been tampered with. JWTs are commonly used for 
authentication: after a user logs in, a JWT is generated and sent to the client, which can then include it in 
subsequent requests to authenticate itself to the server.

*! Q)Shouldn't we write const token = jwt.sign({ username: user.username }, 'secretkey'); as username is inside the 
*! object user ?
Ans)No, it is not necessary to write `const token = jwt.sign({ username: user.username }, 'secretkey')` in this 
case. The original line `const token = jwt.sign({ username }, 'secretkey')` is using a shorthand property name 
syntax, which is a feature of ES6 (ECMAScript 2015).

When defining an object literal, if the property name is the same as the variable name, you can use the shorthand 
syntax to define the property. In this case, `{ username }` is equivalent to `{ username: username }`. Since the 
`username` variable is already defined and in scope, its value will be used as the value of the `username` property 
in the object passed to the `jwt.sign()` method.

So both `const token = jwt.sign({ username }, 'secretkey')` and `const token = jwt.sign({ username: user.username },
'secretkey')` would produce the same result, as long as the value of the `username` variable is the same as the 
value of `user.username`.

*! Q)What is a JWT token ?
Ans)A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for 
securely transmitting information between parties as a JSON object. This information can be verified and trusted 
because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private 
key pair using RSA or ECDSA.

JWTs are commonly used for authentication. Once a user is logged in, each subsequent request will include the JWT, 
allowing the user to access routes, services, and resources that are permitted with that token. Single Sign-On is 
a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across 
different domains¹.

A JWT consists of three parts separated by dots: the header, the payload, and the signature. The header typically 
consists of two parts: the type of the token, which is JWT, and the signing algorithm being used. The payload 
contains the claims, which are statements about an entity (typically, the user) and additional data. The signature 
is created using the header, the payload, and a secret or private key.

In summary, a JWT is a secure way to transmit information between parties as a JSON object. It is commonly used 
for authentication purposes and can be easily used across different domains.
*? ================================================================================================================
*! Q)const token = req.header('Authorization'); - What is the meaning of this line ?

Ans)This line of code retrieves the value of the Authorization header from the incoming request. The req.header
('Authorization') function call returns the value of the Authorization header, which is then assigned to the token 
variable.

The Authorization header is used to send authentication credentials, such as a JWT token, from the client-side code 
to the server. When the server receives a request with an Authorization header, it can use the value of this header 
to authenticate the user and determine if they have permission to access the requested resource. 

*! Q)From where does authentication header gets its value ?
Ans)The value of the Authorization header is set by the client-side code when making a request to the server. The 
client-side code can retrieve the JWT token, for example from local storage or a cookie, and include it in the 
Authorization header of the request.

const token = localStorage.getItem('token'); // Retrieve the token from local storage
fetch('/api/protected', {
  headers: {
    'Authorization': token
  }
})
.then(response => response.json())
.then(data => {
  // Handle the response data
});

In this example, the fetch function is used to make a request to the /api/protected route. The headers option is 
used to set the value of the Authorization header to the value of the token variable, which was retrieved from 
local storage. This token is then sent to the server as part of the request, where it can be used to authenticate 
the user. 
*/