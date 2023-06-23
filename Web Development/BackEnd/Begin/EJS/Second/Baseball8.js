/**
 * ! See template8.ejs for this
 */

const express = require('express');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs')

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
    res.render('template8', {data: data.response[0]})
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred');
  })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

/**
 *?  When you call res.render('template', {data: data.response[0]}), you are passing an object with a single 
 *?  property named data to the template.ejs file. The value of this property is data.response[0].

In your template8.ejs file, you can access the value of this property using the data variable. For example, when you
write <%= data.name %>, you are accessing the name property of the data.response[0] object that you passed to the 
template.
 */