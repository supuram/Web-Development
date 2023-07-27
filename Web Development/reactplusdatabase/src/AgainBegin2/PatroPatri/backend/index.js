import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import uri from './first.js'

const client = new MongoClient(uri)
const app = express()
app.use(cors())
app.use(express.json())

async function startServer(){
    try{
        await client.connect()
        const db = client.db('patropatri')
        const nonVerifiedUsers = db.collection('nonVerifiedUsers')
        const VerifiedUsers = db.collection('VerifiedUsers')

        app.post('/giveinfo', async(req, res) => {
            try{
                const {name, country, religion, date, salary, job, MorF, status, want, phone, email} = req.body
                const user = {name, country, religion, date, salary, job, MorF, status, want, phone, email}
                await nonVerifiedUsers.insertOne(user)
                res.status(200).json({ message: 'Form data submitted successfully' });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while processing the form data' });
            
            }
        })

        app.listen(5000, () => {
            console.log('App is running')
        })
    }
    catch(err){
        console.error(err)
    }
}
startServer()