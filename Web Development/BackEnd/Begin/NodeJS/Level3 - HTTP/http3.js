const http1 = require('http')
const server = http1.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Home Page')
    }
    if(req.url === '/about'){
        // Blocking Code
        for(let i = 0; i < 1000; i++){
            for(let j = 0; j < 1000; j++){
                console.log(`${j} ${i}`)
            }
        }
        res.end('About')
    }
    res.end('Error')
})

server.listen(5000, () => {
    console.log('Server is listening')
})