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
    res.render('map.ejs')
})

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected')

        socket.on("UPDATE_DA_LOCATION", async (data) => {
            const { email, location } = data
            await location.findOneAndUpdate({ email }, { $set: { currentLocation: location } })
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })
}

server.listen(5000, async () => {
    try {
        socketHandler(io)
        await watcher(io)
    }
    catch (error) {
        console.error(error)
    }
})

const watcher = async (io) => {
    const changeStream = location.watch([], { fullDocument: 'updateLookup' });
    changeStream.on('change', (event) => {
        if (event.operationType === 'update') {
            const fullDocument = event.fullDocument;
            io.emit("DA_LOCATION_CHANGED", fullDocument);
        }
    })
}