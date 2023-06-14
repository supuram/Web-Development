http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
  }).listen(8080);

/*
This code creates a simple HTTP server using Node.js. 
1)http.createServer(function (req, res) {...}): This creates a new HTTP server and specifies a callback function to 
be called whenever the server receives a request. The callback function takes two arguments: req, which represents 
the incoming request, and res, which represents the server’s response to the request.

2)res.writeHead(200, {'Content-Type': 'text/html'}): This sets the HTTP status code of the response to 200 (OK) and 
sets the Content-Type header of the response to text/html. This tells the client that the response will contain 
HTML content.

3)res.end('Hello World!'): This sends the response body to the client and ends the response. In this case, the 
response body is the string 'Hello World!'.

4).listen(8080): This tells the server to start listening for incoming requests on port 8080.

When this code is run, it will start an HTTP server that listens for incoming requests on port 8080. Whenever a 
request is received, the server will respond with an HTTP status code of 200 and a response body containing the 
string 'Hello World!'
*/