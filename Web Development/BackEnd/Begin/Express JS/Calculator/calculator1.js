const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/calculator.html")
})

app.post('/', (req, res) => {
    var sum = Number(req.body.num1) + Number(req.body.num2)
    res.send(sum.toString())
})

app.get('/bmicalculator', (req,res) => {
    res.sendFile(__dirname + "/bmicalculator.html")
})

app.post('/bmicalculator', (req, res) => {
    var sum = parseFloat(req.body.weight) / (parseFloat(req.body.height) * parseFloat(req.body.weight))
    res.send(sum.toString())
})

app.listen(3000, function(){
    console.log("server is running")
})