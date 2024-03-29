import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import uri from './first.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import session from 'express-session'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import a from './env.js'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: a.EMAIL,
      pass: a.PASSWORD
    },
})

const client = new MongoClient(uri)
const app = express()
app.use(cors())
app.use(express.json())
const jwtSecret = process.env.JWT_SECRET

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
            secret: jwtSecret,
            resave: false,
            saveUninitialized: false
        }));

        app.get('/logout', (req, res) => {
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
                console.log('Unauthorized')
                res.status(401).send('Unauthorized')
                return
            }
        
            try {
                // Verify JWT
                const decoded = jwt.verify(token, jwtSecret)
        
                // Authentication successful
                res.status(200).send('Protected data')
            } 
            catch (error) {
                // Invalid JWT
                console.log('Forbidden')
                res.status(403).send('Forbidden')
            }
        })        

        // Verify email route
        app.get('/verify/:token', async (req, res) => {
            const verificationToken = req.params.token
    
            try {
                // Find the user in the database based on the verification token
                const user = await collection.findOne({ verificationToken })
        
            if (!user) {
                // User not found or already verified
                res.status(404).send('Invalid verification token')
                return
            }
        
            // Update the user's status to "verified" in the database
            await collection.updateOne(
                { _id: user._id },
                { $set: { verified: true, verificationToken: null } }
            )
        
            // Redirect the user to a success page or display a success message
            res.redirect('/LoginPage')
            } catch (error) {
            console.log(error)
            res.status(500).send('Error verifying email')
            }
        })  

        app.get('/verify-forgot-password-email/:token', async (req, res) => {
            const verificationToken = req.params.token;
          
            try {
              // Find the user in the database based on the verification token
              const user = await collection.findOne({ verificationToken: verificationToken });
          
              if (!user) {
                // User not found or already verified
                return res.status(404).send('Invalid verification token');
              }
          
              // Update the user's status to "verified" in the database
              await collection.updateOne(
                { _id: user._id },
                { $set: { verified: true, resetToken: null, resetTokenExpiresAt: null } }
              );
          
              // Redirect the user to a success page or display a success message
              res.redirect('/LoginPage');
            } catch (error) {
              console.log(error);
              res.status(500).send('Error verifying email');
            }
        });
          

        // For the form inside About.js on the client side
        app.post('/submit-form', async (req, res) => {
            try {
                await collection.insertOne(req.body)
                res.status(200).send('Form data saved')  /* On the client-side, when making the Axios POST request 
to /submit-form, if the server responds with a status of 200 (OK), the client-side code enters the .then block. */
            } catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        // Define the sendVerificationEmail function
        function sendVerificationEmail(email, verificationToken) {
            const mailOptions = {
            from: 'utsa.rkmv@gmail.com',
            to: email,
            subject: 'Account Verification',
            html: `<p>Hello,</p>
                    <p>Thank you for registering. Please verify your email address by clicking the following link:</p>
                    <a href="http://localhost:3000/LoginPage?token=${verificationToken}">Verify Email</a>`,
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // Handle error while sending verification email
            } 
            else {
                console.log('Verification email sent');
                // Handle successful sending of verification email
            }
            });
        }
  
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
                    const verificationToken = generateVerificationToken();
                    const user = {
                        username: text,
                        email: email,
                        password: hashedPassword,
                        verified: false,
                        verificationToken: verificationToken
                    };
                    await collection.insertOne(user)
                    sendVerificationEmail(email, verificationToken);
                }
            } 
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })
        // Function to generate verification token
        function generateVerificationToken() {
            return crypto.randomBytes(20).toString('hex');
        }

        function forgotPasswordToken(email, resetToken){
            const mailOptions = {
                from: 'utsa.rkmv@gmail.com',
                to: email,
                subject: 'Account Verification',
                html: `<p>Hello,</p>
                        <p>Enter the new Password by clicking the following link:</p>
                        <a href="http://localhost:3000/PasswordResetPage?token=${resetToken}">Verify Email</a>`,
                };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    // Handle error while sending verification email
                } 
                else {
                    console.log('Verification email sent');
                    // Handle successful sending of verification email
                }
            });
        }

        app.post('/Forgot-Password', async(req, res) => {
            const {email} = req.body
            try{
                let userExist = await collection.findOne({email})
                if (!userExist) {
                    // User with the provided email doesn't exist
                    return res.status(404).send('User not found');
                }
                const resetToken = generateVerificationToken()
                
                // Save the reset token and its expiration in the user document in your database
                await collection.updateOne(
                    { _id: userExist._id },
                    {
                      $set: {
                        resetToken: resetToken,
                        resetTokenExpiresAt: Date.now() + 3600000,
                        verified: false,
                        verificationToken: resetToken
                      }
                    }
                );
                forgotPasswordToken(email, resetToken)
                res.status(200).send({ email });
            }
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        app.post('/Forgot-Password-Form', async(req, res) => {
            const { resetToken, newPassword, email } = req.body;
            try{
                const user = await collection.findOne({ email });
                console.log('Hi i am Forgot-Password-Form')
                if (!user) {
                    // User not found or the reset token is invalid
                    console.log('Invalid reset token')
                    return res.status(404).send('Invalid reset token');
                }

                // Check if the reset token has expired
                if (user.resetTokenExpiresAt < Date.now()) {
                    // Reset token has expired
                    console.log('Reset token has expired')
                    return res.status(400).send('Reset token has expired');
                }
                newPassword = await bcrypt.hash(password, 10); 
                await collection.updateOne(
                    { _id: user._id },
                    {
                      $set: {
                        password: newPassword,
                        verificationToken: null,
                        resetTokenExpiresAt: null
                      }
                    }
                );
                    console.log('Password reset successfully')
                // Redirect the user to the login page or send a success response
                res.sendStatus(200);
            }
            catch(error){
                console.log(error)
                res.status(500).send('Error Resetting Password')
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
                        if(userExist.verified){
                            const token = jwt.sign({email}, jwtSecret, {expiresIn: '10h'})
                            res.status(200).send({token})
                            return
                        }
                        // else{
                        //     console.log('Please verify your email before logging in')
                        //     res.status(401).send({ message: 'Please verify your email before logging in' });
                        //     return;
                        // }
                    }
                    // else{
                    //     console.log('Invalid email or password')
                    //     res.status(401).send({ message: 'Invalid email or password' });
                    //     return
                    // }
                }
                else{
                    res.redirect('/')
                    return
                }
                // else{
                //     console.log('Invalid email or password again')
                //     res.status(401).send({ message: 'Invalid email or password' });
                //     return
                // }
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