const http1 = require('http')

const server = http1.createServer(function(req, res){
    console.log(req)
    if(req.url === '/'){
        res.write('Hello')  // Sending this to the client
        res.end()
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3,4])) /* We pass this array to JSON.strigify which will convert this array
        into string using JSON syntax and then we will write it to the response */
        res.end()
    }

    res.end(`<h1>Oops we can't find the page you are looking for</h1>`)
})

server.listen(3000)
console.log('Listening on port 3000')