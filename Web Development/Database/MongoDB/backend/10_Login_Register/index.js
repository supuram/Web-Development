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

        // Assuming you're using Express.js framework
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