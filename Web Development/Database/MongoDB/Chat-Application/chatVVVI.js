const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => { /* The event name passed to socket.on on the server side must match the 
    event name passed to socket.emit on the client side in order for the server to receive the emitted event. In 
    this case, the event name is 'chat message', so when the client emits an event using socket.emit('chat message',
    ...), the server will receive it because it is listening for the 'chat message' event using socket.on('chat 
    message', ...). */
      io.emit('chat message' , msg)
    });
})
  
server.listen(3000, () => {
    console.log('listening on 3000')
})

/**
Q)Where does the server listen to the message send by the client via socket.emit ? Does server listen by io.on ?
Ans)Yes, on the server side, you can use the io.on method to listen for events emitted by the client. 

const io = require('socket.io')(http);
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        -> handle the received message here
    });
});

The server listens for incoming connections using the io.on('connection', ...) method. When a new connection is 
established, a socket object is created to represent the connection with the client. The server can then use the 
socket.on method to listen for specific events emitted by the client over that connection.

In this case, the server is listening for the 'chat message' event using socket.on('chat message', ...). When this 
event is received, the server can access the data sent with the event (in this case, the value of the input element)
through the msg parameter of the callback function.

*! VVI Point -
Let me clarify the sequence of events:
1. On the server side, `io.on('connection', ...)` is used to listen for incoming connections from clients. When a 
new client connects, a `socket` object is created to represent the connection with that client.

2. On the client side, `socket.emit` can be used to emit events to the server over the established connection.

3. On the server side, `socket.on` can be used to listen for events emitted by the client over the connection 
represented by the `socket` object.

4. On the server side, `io.emit` can be used to emit an event to all connected clients, while `socket.broadcast.emit`
can be used to emit an event to all connected clients except for the client represented by the `socket` object on 
which the method is called.

5. On the client side, socket.on is used to listen for events emitted by the server over the Socket.IO connection. 
When an event is received, the client can execute a callback function to handle the event and perform any necessary
actions.

So, in summary: `io.on('connection', ...)` is used on the server side to listen for incoming connections and 
create `socket` objects to represent those connections. `socket.emit` is used on the client side to emit events to 
the server, while `socket.on` is used on both the client and server sides to listen for events emitted over a 
specific connection. Finally, `io.emit` and `socket.broadcast.emit` are used on the server side to emit events to 
multiple clients.
*! Q)So, socket.on on the client side listens to whatever io.emit sends from the server side ?
Ans)Yes, that’s correct! On the server side, io.emit can be used to emit an event to all connected clients. On the 
client side, socket.on can be used to listen for events emitted by the server.

For example, if the server emits an event using io.emit('some event', data), all connected clients will receive 
the 'some event' event along with the associated data. On the client side, socket.on('some event', ...) can be 
used to listen for this event and execute a callback function to handle the received data.

It’s important to note that the event name passed to socket.on on the client side must match the event name passed 
to io.emit on the server side in order for the client to receive the emitted event.

*! Conclusion - socket.emit emits a event on the client side. io.on establishes the connection and socket.on on the
*! server side listens to the event emitted by socket.emit. Now io.emit emits the event from server to all the 
*! clients and on the client side socket.on catches this message emitted by io.emit.
*/