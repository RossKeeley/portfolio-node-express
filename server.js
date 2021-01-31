const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, './static/contact.html'));
});

app.get('/about-me', (req, res) => {
  res.sendFile(path.join(__dirname, './static/about-me.html'));
});

app.get('/markdown-previewer', (req, res) => {
  res.sendFile(path.join(__dirname, './static/markdown-previewer.html'));
});

app.get('/random-quote-generator', (req, res) => {
  res.sendFile(path.join(__dirname, './static/random-quote-generator.html'));
});

app.get('/pomodoro-clock', (req, res) => {
  res.sendFile(path.join(__dirname, './static/pomodoro-clock.html'));
});


app.listen(port, (req, res) => {
  console.log(`Express server is listening on port ${port}!`);
});
