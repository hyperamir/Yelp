require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/getRest', (req, res)=> {
  console.log('get all rests!')
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});