// For some reason this code is not working

const https = require('https');
const axios = require('axios');

const server = https.createServer((req, res) => {
  console.log('Received request:', req.url, req.method);
  if (req.url === '/' && req.method === 'GET') {
    const options = {
      method: 'GET',
      hostname: 'v1.baseball.api-sports.io',
      path: '/leagues',
      headers: {
        'x-rapidapi-key': '03751dc23ed8813648f541bee3d317bb'
      }
    };
    console.log('Sending API request:', options);

    const request = https.request(options, response => {
        console.log('Received API response:', response.statusCode, response.statusMessage);
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          console.log('Received API data:', data);
          // Format the data as desired
          const formattedData = JSON.stringify(JSON.parse(data), null, 2);
          // Send the data to the client
          res.setHeader('Content-Type', 'text/html');
          res.end(`<pre>${formattedData}</pre>`);
        });
      })
      
      request.on('error', error => {
        console.error('API request error:', error);
      })
      
      request.end()
    } else {
      console.log('Invalid request:', req.url, req.method);
    }     
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
