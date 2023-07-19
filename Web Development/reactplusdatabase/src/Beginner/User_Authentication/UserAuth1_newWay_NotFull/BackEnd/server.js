require('./db.js')
const app = require('express')()
const port = 3000
const UserRouter = require('../FrontEnd/user.js')
const bodyParser = require('express').json
app.use(bodyParser())

app.use('/user', UserRouter)

app.listen(port, () => {
    console.log('Server is listening')
})