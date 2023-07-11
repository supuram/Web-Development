import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/getData', (req, res) => {
    res.send('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
)})

app.listen(5000, () => {
    console.log('App is running')
})