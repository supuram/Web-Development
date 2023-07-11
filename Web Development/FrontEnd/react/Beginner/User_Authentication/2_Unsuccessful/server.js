const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5000' }));
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Welcome, we are learning React!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});