const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('uploadButton.ejs');
});

app.post('/upload', upload.single('myFile'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});