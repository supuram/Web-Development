// This code does not work

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

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected')

        socket.on("UPDATE_DA_LOCATION", async (data) => {
            const { email, location } = data
            await location.findOneAndUpdate({ email }, { $set: { currentLocation: location } })
        })
        console.log(socket)
        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })
}
//console.log(io)

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
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.watch/
    // db.collection.watch() only notifies on data changes that have persisted to a majority of data-bearing members.
    const changeStream = location.watch([], { fullDocument: 'updateLookup' });
    changeStream.on('change', (event) => {
        if (event.operationType === 'update') {
            const fullDocument = event.fullDocument;
            io.emit("DA_LOCATION_CHANGED", fullDocument);
        }
    })
}
io.on('connection', function(socket){
    console.log('a user connected');
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude 
    let longitude = position.coords.longitude
    let timestamp = position.timestamp
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
    }
}
navigator.geolocation.getCurrentPosition(showPosition, showError);
