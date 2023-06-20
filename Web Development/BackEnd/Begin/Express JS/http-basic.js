const http =require('http')
const server = http.createServer((req, res) => {
    console.log('User hit the server')
    res.end('Home')
})
server.listen(5000)