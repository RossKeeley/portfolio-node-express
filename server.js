const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, './static/contact.html'));
});

app.listen(port, (req, res) => {
  console.log(`Express server is listening on port ${port}!`);
});
