import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    const data = { showHome: true }
    res.json(data)
})

app.listen(5000, () => {
    console.log('App is running')
})