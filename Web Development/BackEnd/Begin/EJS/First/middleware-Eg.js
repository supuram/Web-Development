// https://www.youtube.com/watch?v=_GJKAs7A0_4&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=8 - see this

const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(3000)

app.use((req, res, next) => {
    console.log('Node JS is tough')
    console.log('hostname - ', req.hostname)
    console.log('pathname - ', req.path)
    console.log('method - ', req.method)
    next() // without next the code will not move on to app.get
})

app.get('/', (req, res) => {
    const bl = [
        {title: 'abc', snippet: 'qwe'},
        {title: 'jhg', snippet: 'oiu'},
        {title: 'vbn', snippet: 'vyu'},
    ]
    res.render('ejs1', {title: 'Home', blogs: bl})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'})
})