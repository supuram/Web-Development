import express from 'express'
import cors from 'cors'
import { MongoClient, Binary } from 'mongodb'
import uri from './first.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import session from 'express-session'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import multer from 'multer'
import NodeCache from 'node-cache'
import imageType from 'image-type'
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
const imageCache = new NodeCache();

async function startServer() {
    try {
        await client.connect()
        const db = client.db('store')
        const collection = db.collection('user_registration_information')
        const friends = db.collection('allfriends')
        const finalfriendslist = db.collection('finalfriendslist')
        const notificationAll = db.collection('notificationAll')
        app.get('/', (req, res) => {
            const data = { showHome: true }
            res.json(data)
        })
        
        app.use(session({
            secret: jwtSecret,
            resave: false,
            saveUninitialized: false
        }));
/* ------------------------------------------------------------------------------------------------------------ */
// *! Handles the upload of profile pictures. See ProfileImage.js

        // Function to determine the content type of the image
        function getImageContentType(imageData) {
            const type = imageType(Buffer.from(imageData));   // imageType library expects a buffer as its argument so imageData is converted to buffer before passing it to imageType
            if (type) {
                return `image/${type.ext}`;
            }
            // Default to PNG content type if not recognized
            return 'image/png';
        }

        const upload = multer({ storage: multer.memoryStorage() });
        // Handle image upload
        app.post('/upload', upload.single('image'), async(req, res) => {
            console.log('Post upload entry')
            if (!req.file) {
                console.log('No image uploaded')
                return res.status(400).send('No image uploaded');
            }
            console.log('Image file is found')
            const authHeader = req.headers.authorization
            const token = authHeader && authHeader.split(' ')[1]
            console.log('Entering check token')
            if (!token) {
                // No JWT provided
                console.log('Unauthorized')
                res.status(401).send('Unauthorized')
                return
            }
            let userEmail;
            console.log('After userEmail')
            try {
                // Verify JWT
                const decoded = jwt.verify(token, jwtSecret)
                userEmail = decoded.email
                console.log('Token verified')
            } 
            catch (error) {
                // Invalid JWT
                console.log('Forbidden')
                res.status(403).send('Forbidden')
            }
// Buffer.from is a method provided by Node.js's built-in Buffer module. It is used to create a new Buffer object from various sources, including binary data. 
// req.file.buffer: The buffer property of the req.file object contains the binary data of the uploaded file. The Binary class is a part of the MongoDB Node.js driver. It is used to represent binary data, such as images, in a format that MongoDB can handle.
            const imageBuffer = Buffer.from(req.file.buffer);
            const imageBinary = new Binary(imageBuffer);
            await collection.updateOne(
                { email: userEmail },
                { $set: { filename: req.file.originalname, image: imageBinary } }
            );
            
            // Serialize the imageBinary before storing it in the cache
            const imageBinarySerialized = imageBinary.buffer.toString('base64');
            imageCache.set(userEmail, imageBinarySerialized);  // responsible for storing the image data in an image cache, associating it with the user's email address
            console.log('Image uploaded');
            return res.status(200).send('Image upload successful');
        });
        app.use(express.static('public'));   
        
        app.get('/user/image', async (req, res) => {
            // Verify the user's token and extract their email
            console.log('Entered server side /user/image')
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send('Unauthorized');
            }
        
            let userEmail;
            try {
                const decoded = jwt.verify(token, jwtSecret);
                userEmail = decoded.email;
                console.log('Token Verified')
            } 
            catch (error) {
                return res.status(403).send('Forbidden');
            }
        
            // When retrieving from the cache, deserialize the data
            const cachedImageSerialized = imageCache.get(userEmail);
            if (cachedImageSerialized) {
                try {
                    console.log('Enter if cachedImage')
                    const cachedImageBinary = new Binary(Buffer.from(cachedImageSerialized, 'base64'));
                    const imageContentType = getImageContentType(cachedImageBinary);  
                    res.setHeader('Content-Type', imageContentType);
                    res.send(cachedImageBinary.buffer);  // you are sending the raw binary image data as the response body
                } 
                catch (error) {
                    console.error('Error serving cached image:', error);
                    res.status(500).send('Internal Server Error');
                }
            } 
            else {
                try {
                    // Retrieve user's image data from the database
                    const user = await collection.findOne({ email: userEmail });
                    console.log('Retrieve user image data from the database')
                    if (!user || !user.image) {
                        console.log('User or image data not found')
                        return res.status(404).send('User or image data not found');
                    }
                    const imageBinary = user.image
                    // Serialize the imageBinary before storing it in the cache
                    const imageBinarySerialized = imageBinary.buffer.toString('base64');
                    imageCache.set(userEmail, imageBinarySerialized);
        
                    // Serve the image
                    try {
                        console.log('Serve the image');
                        const imageSerialized = imageCache.get(userEmail);  // if there is image in the cache it returns true
                        if (imageSerialized) {
                            const imageBinary = new Binary(Buffer.from(imageSerialized, 'base64'));
                            const imageContentType = getImageContentType(imageBinary);
                            res.setHeader('Content-Type', imageContentType);
                            res.send(imageBinary.buffer);
                        } 
                        else {
                            // This could happen if there was an issue with caching the image data
                            res.status(404).send('Image not found in cache');
                        }
                    } 
                    catch (error) {
                        console.error('Error serving retrieved image:', error);
                        res.status(500).send('Internal Server Error');
                    }
                } 
                catch (error) {
                    console.error('Error retrieving image from database:', error);
                    res.status(500).send('Internal Server Error');
                }
            }
        });     
/* ------------------------------------------------------------------------------------------------------------- */
// *! See ProfileForm.js , Here the user inputs his personal information

        app.put('/updateProfile', async(req, res) => {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send('Unauthorized');
            }
        
            let email;
            try {
                const decoded = jwt.verify(token, jwtSecret);
                email = decoded.email;
                console.log('Token Verified for updateProfile')
            } 
            catch (error) {
                return res.status(403).send('Forbidden');
            }

            const response = await collection.updateOne(
                { email: email },
                { $set: { fullname: req.body.name, dob: req.body.dob, school: req.body.school, college: req.body.college, university: req.body.uni, workplace: req.body.workplace } }
            );
            if (response.modifiedCount === 1) {
                console.log('Profile updated successfully');
                res.sendStatus(200);
            } else {
                console.log('Profile update failed');
                res.sendStatus(500); // Internal Server Error
            }
        })

        app.get('/userProfileData', async(req, res) => {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send('Unauthorized');
            }
        
            let email;
            try {
                const decoded = jwt.verify(token, jwtSecret);
                email = decoded.email;
                console.log('Token Verified for updateProfile')
                const user = await collection.findOne({ email: email });
                if (!user) {
                    return res.status(404).send('User profile not found');
                }
                res.send(user)
            } 
            catch (error) {
                return res.status(403).send('Forbidden');
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */
// *! See SearchTab.js
        app.get('/searchprofiles', async(req, res) => {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send('Unauthorized');
            }
            const {searchQuery, selectedOption} = req.query
            try {
                const decoded = jwt.verify(token, jwtSecret);
                const whoSendTheFriendReq = await collection.findOne({email: decoded.email})
                if (!whoSendTheFriendReq) {
                    console.log('User profile not found in friendrequest', decoded)
                    return res.status(404).json({ error: 'User profile not found' });
                }
                console.log('Token Verified for searchprofiles')
                const usersCursor = collection.find({
                    [selectedOption]: searchQuery,
                    email: { $ne: whoSendTheFriendReq.email }
                });
                const projection = {email: 1, fullname: 1, school: 1, college: 1, university: 1};
                usersCursor.project(projection);
                // Convert the cursor to an array of documents as .find() returns a cursor and not an array of documents
                const users = await usersCursor.toArray();
                if (!users || users.length === 0) {
                    return res.status(404).send('User profile not found');
                }

                const findLoggedIn = await finalfriendslist.findOne({ mainEmail: whoSendTheFriendReq.email })
                for(const profile of users){
                    if(!findLoggedIn){
                        profile.buttonText = 'Send Friend Request'
                    }
                    else if(findLoggedIn){
                        const findLoggedInFriends = findLoggedIn.friendsEmail
                        let count = 0;
                        for(const element of findLoggedInFriends){
                            if(profile.email == element.email){
                                count = count + 1
                            }
                        }
                        if(count > 0){
                            for(const element of findLoggedInFriends){
                                if(profile.email == element.email && element.status == 'notfriends'){
                                    profile.buttonText = 'Friend Request Already Sent'
                                }
                                else if(profile.email == element.email && element.status == 'friends'){
                                    profile.buttonText = 'You are Friends'
                                }
                            }
                        }
                        else if(count == 0){
                            profile.buttonText = 'Send Friend Request'
                        }
                    }
                }

                console.log(users)
                const responseObj = {
                    users: users,
                    sender: whoSendTheFriendReq.fullname
                };
                console.log('Sender mail = ', whoSendTheFriendReq.fullname)
                console.log(responseObj)
                res.status(200).json(responseObj);
            } 
            catch (error) {
                return res.status(403).send('Forbidden');
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */
// *! When a 'Send Friend Request' button is clicked this gets executed inside handleFriendRequest function in SearchTab.js
        app.post('/friendrequest', async(req, res) => {
            const profile = req.body
            console.log(profile)
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send('Unauthorized in friendrequest');
            }
            try {
                const decoded = jwt.verify(token, jwtSecret);
                console.log('Token Verified for friendrequest', decoded)
                const receiver = await collection.findOne({email: profile.receiver}) // to whom friend request is sent
                console.log('Just Testing = ', receiver.email)

                const whoSendTheFriendReq = await collection.findOne({email: decoded.email})
                if (!whoSendTheFriendReq) {
                    console.log('User profile not found in friendrequest', decoded)
                    return res.status(404).json({ error: 'User profile not found' });
                }
                console.log('In friendrequest after whoSendTheFriendReq')
                const insert = {
                    receiveremail: receiver.email, 
                    friendrequestsender: whoSendTheFriendReq.fullname, 
                    friendrequestsenderemail: whoSendTheFriendReq.email
                }
                await friends.insertOne(insert)
                await finalfriendslist.updateOne({ mainEmail: whoSendTheFriendReq.email }, { $push: { friendsEmail: { email: receiver.email, status: 'notfriends' }}})
                await finalfriendslist.updateOne({ mainEmail: receiver.email }, { $push: { friendsEmail: { email: whoSendTheFriendReq.email, status: 'notfriends'}}})
                res.status(200).json({
                    receiver: receiver.email,
                    sender: whoSendTheFriendReq.fullname
                });
            } 
            catch (error) {
                return res.status(403).send('Forbidden');
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */
// *! See Notification.js
        app.get('/friendreqcheck', async(req, res) => {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            console.log('Entered server side friendreqcheck')
            if (!token) {
                console.log('server side friendreqcheck bad token')
                return res.status(401).send('Unauthorized in friendrequest');
            }
            try {
                const decoded = jwt.verify(token, jwtSecret);
                console.log('server side friendreqcheck = ', decoded)
                const loggedInUser = await collection.findOne({ email: decoded.email })
                if (!loggedInUser) {
                    console.log('User profile not found in friendrequest')
                    return res.status(404).json({ error: 'User profile not found' });
                }
                console.log('after !loggedInUser')
                const checkUser = await friends.findOne({ receiveremail: loggedInUser.email })
                console.log('after checkUser = ', checkUser)

        // *! For Notification of the receiver
                if(checkUser){
                    const checkreceiveremail = await finalfriendslist.findOne({ mainEmail: loggedInUser.email })
                    console.log('after checkreceiveremail', checkreceiveremail)
                    if(checkreceiveremail){
                        console.log('server side friendreqcheck checkreceiveremail')
                        const friendsEmailarray = checkreceiveremail.friendsEmail
                        for(let i = 0; i < friendsEmailarray.length; i++){
                            console.log(friendsEmailarray[i].email)
                            if(friendsEmailarray[i].email == checkUser.friendrequestsenderemail && friendsEmailarray[i].status == 'friends'){
                                console.log('if of checkreceiveremail', checkUser.friendrequestsender)
                                return res.status(200).json({ message: 'You are friends with', nameOfSender: checkUser.friendrequestsender })
                            }
    
                            else if(friendsEmailarray[i].email == checkUser.friendrequestsenderemail && friendsEmailarray[i].status == 'notfriends'){
                                console.log('notfriends in friendreqcheck checkreceiveremail')
                                return res.status(200).json({ nameOfSender: checkUser.friendrequestsender, emailOfReceiver: checkUser.receiveremail, emailOfSender: checkUser.friendrequestsenderemail })
                            }
                        }
                    }
                    else{
                        console.log('complete else in friendreqcheck = ', checkUser.receiveremail)
                        return res.status(200).json({ nameOfSender: checkUser.friendrequestsender, emailOfReceiver: checkUser.receiveremail, emailOfSender: checkUser.friendrequestsenderemail })
                    }
                }

        // *! For Notification of the Sender
                const chechUserSender = await friends.findOne({ friendrequestsenderemail: loggedInUser.email })
                if(chechUserSender){
                    const checksenderemail = await finalfriendslist.findOne({ mainEmail: loggedInUser.email })
                    console.log('after checksenderemail', checksenderemail)
                    if(checksenderemail){
                        console.log('server side friendreqcheck checksenderemail')
                        const friendsEmailarray = checksenderemail.friendsEmail
                        for(let i = 0; i < friendsEmailarray.length; i++){
                            console.log('friendsEmailarray[i].email', friendsEmailarray[i].email)
                            if(friendsEmailarray[i].email == chechUserSender.receiveremail && friendsEmailarray[i].status == 'friends'){
                                console.log('if of checksenderemail', chechUserSender.receiveremail)
                                return res.status(200).json({ message: 'Your friend request has been approved' })
                            }
                        }
                    }
                }
            }
            catch (error) {
                console.error('Error in friendreqcheck = ', error)
                return res.status(403).send('Forbidden');
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */
// *! Notification.js
        app.get('/notificationClient', async(req, res) => {
            const { messagefriend, sendernamefriend } = req.body;
            try{
                await notificationAll.insertOne({ messagefriend: messagefriend })
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                return res.status(200).send('OK')
            }
            catch(err){
                console.log('Error in notification', err)
                return res.status(500).send('Internal Server Error');
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */

// *! NotificationDashboard.js, after Accept Request button is clicked
        app.get('/acceptfriendrequest', async(req, res) => {
            const { receiverEmail, senderEmail } = req.query;

            const findsenderEmail = await finalfriendslist.findOne({ mainEmail: senderEmail })
            if(findsenderEmail){
                await finalfriendslist.updateOne({ mainEmail: senderEmail }, { $pull: { friendsEmail: { email: receiverEmail, status: 'notfriends' }}})
                await finalfriendslist.updateOne({ mainEmail: senderEmail }, { $push: { friendsEmail: { email: receiverEmail, status: 'friends' }}})
            }
            else{
                await finalfriendslist.insertOne({ mainEmail: senderEmail, friendsEmail: [{ email: receiverEmail, status: 'friends' }] })
            }

            const findreceiverEmail = await finalfriendslist.findOne({ mainEmail: receiverEmail })
            if(findreceiverEmail){
                await finalfriendslist.updateOne({ mainEmail: receiverEmail }, { $pull: { friendsEmail: { email: senderEmail, status: 'notfriends'}}})
                await finalfriendslist.updateOne({ mainEmail: receiverEmail }, { $push: { friendsEmail: { email: senderEmail, status: 'friends'}}})
            }
            else{
                await finalfriendslist.insertOne({ mainEmail: receiverEmail, friendsEmail: [{ email: senderEmail, status: 'friends' }]})
            }
            return res.status(200).send('OK')
        })
/* -------------------------------------------------------------------------------------------------------------- */

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
                let email = decoded.email
                // Authentication successful
                res.status(200).send(email)
            } 
            catch (error) {
                // Invalid JWT
                console.log('Forbidden')
                res.status(403).send('Forbidden')
            }
        })        

        // Verify email route
        app.get('/verify', async (req, res) => {
            const verificationToken = req.query.token
            console.log('verificationToken = ',verificationToken)
            try {
                // Find the user in the database based on the verification token
                const user = await collection.findOne({ verificationToken })
                console.log('user = ', user)
        
            if (!user) {
                // User not found or already verified
                console.log('Invalid verification token')
                res.status(404).send('Invalid verification token')
                return
            }
            console.log('entered verify token email')
            // Update the user's status to "verified" in the database
            await collection.updateOne(
                { _id: user._id },
                { $set: { verified: true }, $unset:{ verificationToken: 1 } }
            )
            console.log('exit update email token to true')
            res.status(200).json({ message: 'Email verified successfully' });
            // Redirect the user to a success page or display a success message
            // res.redirect('/LoginPage')
            } 
            catch (error) {
                console.log(error.message)
                res.status(500).send('Error verifying email')
            }
        })  

        app.get('/verify-forgot-password-email', async (req, res) => {
            const verificationToken = req.query.resetToken;
            try {
                // Find the user in the database based on the verification token
                const user = await collection.findOne({ verificationToken: verificationToken });

                if (!user) {
                    console.log('Invalid verification token from forgot password')
                    // User not found or already verified
                    return res.status(404).send('Invalid verification token');
                }
            
                console.log('entered verify token email for forgot password')
                // Update the user's status to "verified" in the database
                await collection.updateOne(
                    { _id: user._id },
                    { $set: { verified: true } }//resetToken: null, resetTokenExpiresAt: null
                );
                console.log('exit update email token to true for forgot password')
                res.status(200).json({ message: 'Email verified successfully for forgot password' });
            } 
            catch (error) {
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
                    <a href="http://localhost:3000/verify?token=${verificationToken}">Verify Email</a>`,
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // Handle error while sending verification email
            } 
            else {
                console.log('Verification email sent - from nodemailer');
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
                    console.log('User in database')
                    res.status(200).send({ message : 'User registered successfully. Please Login'})
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
                        <a href="http://localhost:3000/verify-forgot-password-email?resetToken=${resetToken}">Verify Email</a>`,
                };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    // Handle error while sending verification email
                } 
                else {
                    console.log('Verification email sent- from nodemailer for forgot password');
                    // Handle successful sending of verification email
                }
            });
        }

        app.post('/Forgot-Password', async(req, res) => {
            const {email} = req.body
            try{
                let userExist = await collection.findOne({email})
                if (!userExist) {
                    console.log('Email not found in Forgot-Password snippet')
                    // User with the provided email doesn't exist
                    return res.status(404).send('User not found');
                }
                const resetToken = generateVerificationToken()
                console.log('Reset Token in Forgot-Password snippet = ', resetToken)
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
                console.log('In Forgot-Password successfully updated in Database')
                //console.log('resetTokenExpiresAt = ', resetTokenExpiresAt, 'Current Date = ', Date.now())
                forgotPasswordToken(email, resetToken)
                res.status(200).send({ email });
            }
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })

        app.post('/Forgot-Password-Form', async(req, res) => {
            const { resetToken, password, email } = req.body;
            try{
                const user = await collection.findOne({ verificationToken: resetToken });
                console.log('Hi i am Forgot-Password-Form')
                if (!user) {
                    // User not found or the reset token is invalid
                    console.log('User with the email not found in Forgot-Password-Form')
                    return res.status(404).send('Invalid reset token');
                }
                console.log('User exists and Current Date = ', Date.now())
                // Check if the reset token has expired
                if (user.resetTokenExpiresAt < Date.now()) {
                    // Reset token has expired
                    console.log('Reset token has expired')
                    return res.status(400).send('Reset token has expired');
                }
                console.log('Reset Token has not expired, Hurray !!!!!')
                const newPassword = await bcrypt.hash(password, 10); 
                console.log('Hashed Password done')
                await collection.updateOne(
                    { _id: user._id },
                    {
                      $set: {
                        password: newPassword,
                        resetToken: null,
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

// *! For the form inside Login_Page.js on the client side 
        app.post('/Login-Page-Form', async (req, res) => {
            const {email, password} = req.body
            try {
                let userExist = await collection.findOne({email}) // returns the entire document and so userExist contains both email and password
                if(userExist){
                    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
                    console.log(password)
                    if(isPasswordMatch){
                        if(userExist.verified){
                            const token = jwt.sign({email}, jwtSecret, {expiresIn: '10h'})
                            console.log(token)
                            res.status(200).send({token})
                            return
                        }
                        else{
                             console.log('Please verify your email before logging in')
                             res.status(401).send({ message: 'Please verify your email before logging in' });
                             return;
                        }
                    }
                    else{
                         console.log('Invalid email or password')
                         res.status(401).send({ message: 'Invalid email or password' });
                         return
                    }
                }
                else{
                    console.log('Hmmmm')
                    res.redirect('/')
                    return
                }
            } 
            catch (error) {
                console.log(error)
                res.status(500).send('Error saving form data')
            }
        })
/* -------------------------------------------------------------------------------------------------------------- */
      
        app.listen(5000, () => {
            console.log('App is running')
        })
    } 
    catch (error) {
        console.log(error)
    }
}
startServer()