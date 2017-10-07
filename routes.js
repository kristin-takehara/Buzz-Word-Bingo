//jshint esversion: 6

let express = require('express');
let router = express.Router();

router.get('/', (req, res)=> {
  res.send('index.html');
});

router.get('/buzzword', (req, res) => {
  res.send('Some Dude');
});

router.post('/buzzword', (req, res) => {
  res.send('Creating a Dude');
});

router.put('/buzzword', (req, res) => {
  res.send('Creating a Dude');
});