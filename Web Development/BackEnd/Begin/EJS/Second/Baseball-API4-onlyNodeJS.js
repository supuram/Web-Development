// Done by Bing using only NodeJS

const http = require('http');
const axios = require('axios');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
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
      res.setHeader('Content-Type', 'text/html');
      res.end(`<pre>${formattedData}</pre>`);
    }).catch(error => {
      console.error(error);
      res.statusCode = 500;
      res.end('An error occurred');
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});