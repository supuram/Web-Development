const http1 = require('http')
const server = http1.createServer()
server.on('request', (_req,res) => {
    res.end('Welcome')
})
server.listen(5000)

/*
The third line sets up an event listener for the request event, which is emitted whenever the server receives an 
incoming request. The callback function takes two arguments: the request object and the response object. 
*/