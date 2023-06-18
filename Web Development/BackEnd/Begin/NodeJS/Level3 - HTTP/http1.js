const http1 = require('http')

const server = http1.createServer()
/* What is interesting is that this server is an EventEmitter. So it has all the capabilities of an Event Emitter
that we saw earlier. */

/* Name of the event is 'connection' and the actual Listener is the function socket of type socket class which 
returns void */
server.addListener('connection', (socket) => {
    console.log('New Connection')
}) 
server.listen(3000)
console.log('Listening on port 3000')
/* Everytime there is a new connection or new request this server raises an event so that we can use the own method
to handle that event. So before listning via server.listen(3000) we want to register a listener. */