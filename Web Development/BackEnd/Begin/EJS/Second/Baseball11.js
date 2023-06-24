const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs')

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
    res.render('template11-login')
})

app.get('/id', (req, res) => {
    axios.request(options).then(response => {
      const data = response.data;
      // Render the EJS template with the data
      res.render('template11', {data: data})
    }).catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    })
})

app.post('/', (req, res) => {
    const input1 = req.body.input1;
    const input2 = req.body.input2;

    fs.readFile('readFile11.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500);
        } 
        else {
            const lines = data.split('\n');
            let found = false;
            for (let line of lines) {
                const [username, password] = line.split(' ');
                if (username === input1 && password === input2) {
                    found = true;
                    break;
                }
            }
            if (found) {
                res.redirect('/id');
            } 
            else {
                fs.appendFile('readFile11.txt', `${input1} ${input2}\n`, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500);
                    } else {
                        res.redirect('/id');
                    }
                });
            }
        }
    });
});


app.post('/id', (req, res) => {
    const input = req.body.input; /* input in the req.body.input is the name ="input" in <input type="number" 
    id="title" name="input">. req.body contains data from the form */
  
    axios.request(options).then(response => {
        const data = response.data;

        // Render the EJS template with the data and input
        res.render('template11', {data: data, input: input})

        // Extract the data associated with the input ID
        const idData = data.response.find(item => item.id === parseInt(input));
        // find can be used with only arrays

        fs.appendFile('number11.txt', JSON.stringify(idData) + '\n', (err) => {
            // use fs.appendFile if you do not want the data in nymber10.txt to be overwritten
            if (err) {
                console.error(err);
                res.status(500)
            } 
        })
    }).catch(error => {
      console.error(error);
    })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

/** 
In the context of the provided code snippet, the line const [username, password] = line.split(' '); splits the line 
string into an array of substrings by separating the string at each occurrence of the space character (' '). The 
first two elements of the resulting array are then assigned to the username and password variables using array 
destructuring.
If data is a string containing the following text - Hello World, Then calling data.split('\n') would return an 
array with two elements: ['Hello', 'World'].

*!When you use res.redirect('/id'), it sends a response to the client telling it to make a new GET request to the
*? /id URL. This means that your app.get('/id', ...) route will be called, not your app.post('/id', ...) route. If
*? you do not have an app.get('/id', ...) route set up, your server will return a “Cannot GET /id” error message.

*! app.post('/', (req, res) => {
*!   const input1 = req.body.input1;
*!   const input2 = req.body.input2;
*! How does app.post understands that it has to look in template11-login.ejs file to get input1 and input2? I mean 
*! what if it had to look through 1 crore files ?

*? app.post('/', ...) does not need to look through any files to get the values of input1 and input2. When a form 
is submitted, the data entered in the form is sent to the server as part of the request body. The name attribute of 
*? the input fields in the form specifies the key that will be used to store the data in the request body.
In your template11-login.ejs template, you have two input fields with name attributes set to "input1" and "input2".
When the form is submitted, it sends a POST request to the root URL (/) because the action attribute of the form is 
set to "/" and the method attribute is set to "POST". This means that your app.post('/') route will be called when 
the form is submitted.
In your app.post('/') route, you can access the data sent in the request body using the req.body object. Since the 
*? keys in this object correspond to the name attributes of the input fields in your form, you can access the data 
*? entered in the input fields with name="input1" and name="input2" using req.body.input1 and req.body.input2, 
respectively.
*/