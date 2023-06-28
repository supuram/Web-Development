const {MongoClient} = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const uri = require('./first.js')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const cron = require('node-cron')
const client = new MongoClient(uri)
const database = client.db('store')
const userLoginAndRegistration = database.collection('user_registration_information')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('userlogin2.ejs')
})

app.get('/Home', (req, res) => {
    res.render('homepage.ejs')
})

app.get('/register', (req, res) => {
    res.render('user_register.ejs')
})

app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword2.ejs')
})

app.post('/', async(req, res) => {
    const input1 = req.body.input1
    const input2 = req.body.input2

    try{
        const query = {username : input1, password : input2}
        const findPassword = await userLoginAndRegistration.findOne(query)
        if(findPassword){
            res.redirect('/Home')
        }
        else{
            res.redirect('/register')
        }
    }
    catch(err){
        console.error(err)
    }
})

app.post('/register', async(req, res) => {
    const input1 = req.body.input1
    const input2 = req.body.input2
    const input3 = req.body.input3
    const input4 = req.body.input4
    console.log(input3)
    console.log(input4)
    if(input3 != input4){
        res.redirect('/register')
    }
    try{
        const doc = {
            Full_Name : input1,
            username : input2,
            password : input3,
            same_password : input4
        }
        await userLoginAndRegistration.insertOne(doc)
        res.redirect('/')
    }
    catch(err){
        console.error(err)
    }
})

app.post('/forgotpassword', async(req, res) => {
    const input1 = req.body.input1
    try{
        const query = {username : input1}
        const findemail = await userLoginAndRegistration.findOne(query)
        if(findemail){
            const token = crypto.randomBytes(20).toString('hex');
            const expires = Date.now() + 3600000; // 1 hour from now
            const update = {
                $set: {
                  passwordResetToken: token,
                  passwordResetExpires: expires
                }
            }
            await userLoginAndRegistration.updateOne(query, update)

            /*if(Date.now() - user.passwordResetExpires > 3600000){
                const del = {
                    passwordResetToken: token,
                    passwordResetExpires: expires
                }
                await userLoginAndRegistration.deleteOne(query, del)
            }
            No, the expires and token values will not be automatically deleted after 1 hour in the code you provided. 
            The code checks if the token has expired immediately after it is created and updated in the database, which
            means that the check (Date.now() - user.passwordResetExpires > 3600000) will always be false at that point 
            in time.
            To automatically delete the expires and token values after 1 hour, you could use a background job or a 
            cron job that periodically checks the database for expired tokens and deletes them. Alternatively, you 
            could check if the token has expired when the user tries to reset their password using the token and 
            delete it at that point if it has expired.
            */

            // Send password reset email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'youremail@gmail.com', // your company mail
                    pass: 'abcg'
                }
            })
            const mailOptions = {
                to: findemail.username,
                from: 'youremail@gmail.com',  
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the 
                password for your account.\n\nPlease click on the following link, or paste this into your browser 
                to complete the process:\n\nhttp://localhost:3000/reset-password/${token}\n\nIf you did not request
                this, please ignore this email and your password will remain unchanged.\n`
            };
            await transporter.sendMail(mailOptions);
            res.send('Password reset email sent');
            res.redirect('/')
        }
        else{
            res.redirect('/register')
        }
    }
    catch(err){
        console.error(err)
    }
})

// Schedule a cron job to run every hour
cron.schedule('0 * * * *', async () => {
    // Find all users with expired tokens
    const users = await userLoginAndRegistration.find({ passwordResetExpires: { $lt: new Date() } }).toArray();
    
    // Delete the token and expires values for each user
    for (const user of users) {
        await userLoginAndRegistration.updateOne(
            { _id: user._id },
            { $unset: { passwordResetToken: "", passwordResetExpires: "" } }
        );
    }
  });
app.listen(4000, () => {
    console.log('Server listening on port 4000');
})

/*
The '0 * * * *' is a cron expression that specifies when the cron job should run. Cron expressions consist of 5 
space-separated fields that represent different units of time, in the following order: minute, hour, day of the 
month, month, and day of the week.

In this case, the cron expression '0 * * * *' means “run the cron job at minute 0 of every hour of every day of 
every month.” In other words, the cron job will run once every hour, at the top of the hour.

Here’s a breakdown of each field in the cron expression:

0: The first field represents the minute. 0 means “run at minute 0.”
*: The second field represents the hour. * means “run at every hour.”
*: The third field represents the day of the month. * means “run on every day of the month.”
*: The fourth field represents the month. * means “run on every month.”
*: The fifth field represents the day of the week. * means “run on every day of the week.”
*/