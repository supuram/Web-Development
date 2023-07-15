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
    // Configure the transport options (SMTP server, credentials, etc.)
    // Refer to the nodemailer documentation for more details
    // Example configuration for Gmail:
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
            } 
            catch (error) {
                // Invalid JWT
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
                        else{
                            res.status(401).send({ message: 'Please verify your email before logging in' });
                            return;
                        }
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
*! TroubleShooting an error
A major error was occuring with 403 error due to line 29 where I wrote jwtSecret = crypto.randomBytes(32).toString
('hex'). What happens if i write this listen from Bing -
Based on the code you provided, it looks like you're generating a new `jwtSecret` every time the server starts by 
using the `crypto.randomBytes` method. This means that the secret used to sign the JWT token will be different 
every time the server restarts, which could cause issues with verifying the token.

To fix this issue, you should use a fixed `jwtSecret` that doesn't change between server restarts. You can do this 
by setting the `jwtSecret` to a fixed value or by storing it in an environment variable or configuration file that 
is loaded when the server starts.

Once you have a fixed `jwtSecret`, you should be able to sign and verify JWT tokens consistently between server 
restarts. This should resolve the issue with the `403 Forbidden` error when making requests to the `/protected-route` 
route.

*! Q)So jwtSecret should remain same everytime. But why we use random code everytime for email in function 
*! generateVerificationToken() ?
Ans)The `generateVerificationToken` function generates a random verification token using the `crypto.randomBytes` 
method. This token is used to verify the user's email address by sending them an email with a link that includes 
the token. When the user clicks on the link, the server can check if the token is valid and mark the user's email 
address as verified.

The reason why a random verification token is generated every time is to ensure that each user has a unique token 
that can't be easily guessed or reused by someone else. This helps to prevent unauthorized access to the user's 
account and ensures that only the user who has access to the email address can verify it.

In contrast, the `jwtSecret` is used to sign and verify JWT tokens, which are used for authentication. The 
`jwtSecret` needs to remain consistent between server restarts so that previously issued JWT tokens can still be 
verified. If the `jwtSecret` were to change, all previously issued JWT tokens would become invalid and users would 
have to log in again.

I hope this explanation helps you understand the difference between the verification token and the `jwtSecret`.
*? -----------------------------------------------------------------------------------------------------------------

*! Q)app.get('/verify/:token', async (req, res) => {const verificationToken = req.params.token
*! Here what does req.params.token do ? is req.params predefined ?
Ans)In the code you provided, req.params.token is used to access the value of the token URL parameter. req is an 
object representing the HTTP request, and req.params is an object containing the route parameters extracted from 
the URL path.

In this case, the route is defined as /verify/:token, which means that any value passed in the URL after /verify/
will be captured as a route parameter named token. For example, if the user clicks on a verification link with 
the URL http://localhost:3000/verify/12345, then req.params.token will be equal to '12345'.

req.params is not predefined, but it’s a property of the req object provided by the Express framework. The req.
params object is populated by Express based on the route parameters defined in the route path.

*! Q)Why are we setting verificationToken to null here - await collection.updateOne({ _id: user._id },
*! { $set: { verified: true, verificationToken: null } })
Ans)The verificationToken is being set to null after the user’s email has been verified to indicate that the 
token is no longer needed. Once the user’s email has been verified, there is no need to keep the verificationToken
in the database, so it can be safely removed.

Setting the verificationToken to null also helps to prevent the token from being reused. If the verificationToken 
were to remain in the database after the user’s email has been verified, someone else could potentially use it to 
verify a different email address. By setting the verificationToken to null, you ensure that it can’t be reused 
and that each user has a unique token that can only be used once.

*! Q)const transporter = nodemailer.createTransport({service: 'gmail', auth: { user: a.EMAIL, pass: a.PASSWORD },})
*! What does this code do ?
Ans)This code creates a `transporter` object using the `nodemailer` library. The `transporter` object is used to 
send emails using the specified transport options. In this case, the transport options are configured to use the 
Gmail service with the specified email address and password for authentication.

The `nodemailer.createTransport` method takes an options object as an argument, which specifies the transport 
options to use. In this case, the `service` option is set to `'gmail'`, which tells `nodemailer` to use the Gmail 
service for sending emails. The `auth` option is an object that specifies the email address and password to use for 
authentication with the Gmail service.

Once the `transporter` object is created, it can be used to send emails using the `sendMail` method. You can refer 
to the `nodemailer` documentation for more information on how to use the `transporter` object to send emails.

*! Q)If i don't use ?token=${verificationToken}, is the email actually getting verified (line 138)?
Ans)No, without including the `verificationToken` in the verification link, the email is not actually getting 
verified. The purpose of the `verificationToken` is to provide a unique, randomly generated token that can be used 
to verify that the user has access to the email address they provided during registration.

When the user clicks on the verification link, your server-side code should check if the `verificationToken` 
included in the link matches the one that was generated and sent to the user's email address. If the tokens match, 
it means that the user has access to the email address and their email address can be marked as verified.

Without including the `verificationToken` in the verification link, there is no way for your server-side code to 
verify that the user has access to the email address. This means that anyone could click on the verification link 
and mark the email address as verified, even if they don't have access to it.

I hope this explanation helps you understand why it's important to include the `verificationToken` in the verificat-
ion link.

*! Q)transporter.sendMail(mailOptions, (error, info) - Explain this one.
Ans)This portion of the code is responsible for sending the verification email using the `transporter.sendMail` 
method. The `transporter.sendMail` method takes two arguments: `mailOptions`, which specifies the details of the 
email to send, and a callback function that is called when the email has been sent or if an error occurs.

The callback function takes two arguments: `error` and `info`. If an error occurs while sending the email, the 
`error` argument will contain information about the error and the `info` argument will be `undefined`. If the email 
is sent successfully, the `error` argument will be `null` and the `info` argument will contain information about 
the sent email.

In this code, the callback function checks if the `error` argument is truthy. If it is, it logs the error to the 
console and handles the error while sending the verification email. If the `error` argument is falsy, it logs a 
message indicating that the verification email was sent successfully and handles the successful sending of the 
verification email.
*/