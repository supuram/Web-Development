const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const location = database.collection('location')
const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('map1.ejs')
})

io.on('connection', (socket) => {
    console.log('client')
    socket.on('positionUpdate', (data) => {
        let {latitude, longitude, timestamp} = data;
        console.log(`Position updated: ${latitude}, ${longitude}, ${timestamp}`);
    })
})
server.listen(3000)