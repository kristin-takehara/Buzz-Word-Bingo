//jshint esversion: 6

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('hi hi');
});

app.get('/buzzwords', (req, res) => {
  res.send();
});

app.post('/buzzword', (req, res) => {
  res.send(200, {
    'Content-Type': 'application/json',
    'success': 'true'
  });
});

app.listen(3000, function () {
  console.log('Buzz-Word-Bingo listening on port 3000!');
});