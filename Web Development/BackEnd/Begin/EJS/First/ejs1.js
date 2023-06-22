const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(3000)

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