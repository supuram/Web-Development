/**
 * ! See template8.ejs for this
 */

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

const options = {
    method: 'GET',
    url: 'https://v1.baseball.api-sports.io/leagues',
    headers: {
      'x-rapidapi-key': '03751dc23ed8813648f541bee3d317bb'
    }
}

app.get('/', (req, res) => {
  axios.request(options).then(response => {
    const data = response.data;
    // Render the EJS template with the data
    res.render('template9', {data: data})
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred');
  })
})

app.post('/', (req, res) => {
    const input = req.body.input;
  
    axios.request(options).then(response => {
      const data = response.data;
      // Render the EJS template with the data and input
      res.render('template9', {data: data, input: input})
    }).catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    })
  })

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});