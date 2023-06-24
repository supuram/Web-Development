const express = require('express')
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readFile('govAPI.json', (err, data) => {
        if(err){
            console.error(err)
            return
        }
        else{
            res.render('template-gov', {data: data})
        }
    })
})

app.listen(4000, () => {
    console.log('Server listening on port 4000');
  });