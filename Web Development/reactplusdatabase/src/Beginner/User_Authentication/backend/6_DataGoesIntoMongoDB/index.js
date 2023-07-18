import express from 'express'
import cors from 'cors'
import { MongoClient} from 'mongodb'
import uri from './first.js'
const client = new MongoClient(uri)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    const data = { showHome: true }
    res.json(data)
})

app.post('/submit-form', async (req, res) => {
    try {
        await client.connect()
        const db = client.db('store')
        const collection = db.collection('user_registration_information')
        await collection.insertOne(req.body)
        res.status(200).send('Form data saved')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error saving form data')
    } finally {
        await client.close()
    }
})

app.listen(5000, () => {
    console.log('App is running')
})