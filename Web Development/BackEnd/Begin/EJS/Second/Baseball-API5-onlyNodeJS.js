/**
 * !Q) Why this code is not running ?
 * ? you are using the http module to send a request to an https URL. You should use the https module instead of 
 * ? the http module when sending requests to https URL
 */

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

    const request = http.request(options, response => {
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          // Format the data as desired
          const formattedData = JSON.stringify(JSON.parse(data), null, 2);
          // Send the data to the client
          res.setHeader('Content-Type', 'text/html');
          res.end(`<pre>${formattedData}</pre>`);
        });
      })
      
      request.on('error', error => {
        console.error(error);
      })
      
      request.end()
    }      
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
