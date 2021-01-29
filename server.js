const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Ello ello Express');
});

app.listen(port, (req, res) => {
  console.log(`Express server is listening on port ${port}!`);
});
