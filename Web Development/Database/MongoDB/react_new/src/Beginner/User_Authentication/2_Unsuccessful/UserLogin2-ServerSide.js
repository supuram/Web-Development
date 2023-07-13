// server
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = require('./first.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({origin : 'http://localhost:5000'}));
const PORT = 5000;

// Connect to MongoDB
let db;
let userLoginAndRegistration;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, {
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
app.use(express.json());

app.get('/Home', (req, res) => {
    res.send('Welcome to the homepage');
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)  
  try{
    let userExist = await userLoginAndRegistration.findOne({ username });
    console.log('Found Running')
    if(userExist){
        res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
    console.log('hashed')
    // Create a new user
    const user = {
      username: username,
      password: hashedPassword,
    };
    console.log('user created')
    await userLoginAndRegistration.insertOne(user);
  }
  catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
        // Find the user by username
        const user = await userLoginAndRegistration.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
  
        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ username }, 'secretkey');

        res.status(200).json({ token });  // sends to the client
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});