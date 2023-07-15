import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import uri from './first.js'
import bcrypt from 'bcrypt'

const client = new MongoClient(uri)
const app = express()
app.use(cors())
app.use(express.json())

async function startServer() {
    try {
        await client.connect()
        const db = client.db('store')
        const collection = db.collection('user_registration_information')

        app.get('/', (req, res) => {
            const data = { showHome: true }
            res.json(data)
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
                    res.redirect('/')
                    return
                }
                const hashedPassword = await bcrypt.hash(password, 10); 
                const user = {
                    username: text,
                    email: email,
                    password: hashedPassword,
                };
                await collection.insertOne(user)
                res.status(200).send('Form data saved')
            } catch (error) {
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
                        res.redirect('/')
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