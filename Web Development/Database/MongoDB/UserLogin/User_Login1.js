const {MongoClient} = require('mongodb')
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const userLoginAndRegistration = database.collection('user_registration_information')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('userlogin.ejs')
})

app.get('/Home', (req, res) => {
    res.render('homepage.ejs')
})

app.get('/register', (req, res) => {
    res.render('user_register.ejs')
})

app.post('/', async(req, res) => {
    const input1 = req.body.input1
    const input2 = req.body.input2

    try{
        const query = {username : input1, password : input2}
        const findPassword = await userLoginAndRegistration.findOne(query)
        if(findPassword){
            res.redirect('/Home')
        }
        else{
            res.redirect('/register')
        }
    }
    catch(err){
        console.error(err)
    }
})

app.post('/register', async(req, res) => {
    const input1 = req.body.input1
    const input2 = req.body.input2
    const input3 = req.body.input3
    const input4 = req.body.input4
    console.log(input3)
    console.log(input4)
    if(input3 != input4){
        res.redirect('/register')
    }
    try{
        const doc = {
            Full_Name : input1,
            username : input2,
            password : input3,
            same_password : input4
        }
        await userLoginAndRegistration.insertOne(doc)
        res.redirect('/')
    }
    catch(err){
        console.error(err)
    }
})
app.listen(4000, () => {
    console.log('Server listening on port 4000');
})