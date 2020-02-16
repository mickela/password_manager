const express = require('express');
const router = require('./routes/index');
const multer = require('multer');
const upload = multer();
const db = require('./config/db');
const app = express();

app.use(express.static('./public'));
app.use(upload.array());

app.use(router);
// app.disable('X-Powered-By');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));