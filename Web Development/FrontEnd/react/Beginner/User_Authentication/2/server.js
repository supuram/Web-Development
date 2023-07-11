// server
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin : 'http://localhost:5000'}));
const PORT = 5000;

app.use(express.json());

app.get('/Home', (req, res) => {
    res.send('Welcome to the homepage');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});