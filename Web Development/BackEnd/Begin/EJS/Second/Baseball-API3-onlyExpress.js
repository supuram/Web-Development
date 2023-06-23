// Done by Bing only using ExpressJS

const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://v1.baseball.api-sports.io/leagues',
    headers: {
      'x-rapidapi-key': '03751dc23ed8813648f541bee3d317bb'
    }
  };

  axios.request(options).then(response => {
    const data = response.data;
    // Format the data as desired
    const formattedData = JSON.stringify(data, null, 2);
    // Send the data to the client
    res.send(`<pre>${formattedData}</pre>`);
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred');
  });
});

/**
 * <pre> is an HTML tag that defines preformatted text. It is used to display text exactly as it is written in the 
 * HTML file, including any spaces or line breaks
 */

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
