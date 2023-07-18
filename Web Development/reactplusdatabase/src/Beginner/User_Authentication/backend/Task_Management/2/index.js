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

const client = new MongoClient(uri)
const app = express()
app.use(cors())
app.use(express.json())
const jwtSecret = process.env.JWT_SECRET

async function startServer() {
    try {
        await client.connect()
        const db = client.db('store')
        const collection = db.collection('employeeTask')

        app.get('/', (req, res) => {
            const data = { showHome: true }
            res.json(data)
        })
        
        app.use(session({
            secret: jwtSecret,
            resave: false,
            saveUninitialized: false
        }));

        app.post('/submitTask', async(req, res) => {
            const {name,description, date, priority} = req.body
            try{
                const task = {
                    EmployeeName : name,
                    TaskDescription : description,
                    SubmitDate : date,
                    Priority : priority
                }
                await collection.insertOne(task)
                res.send('Done')
            }
            catch(err){
                console.log(err)
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