//jshint esversion: 6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const buzzwords = require('./buzzword.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', buzzwords); //serve index.html (located in the public directory)

app.listen(3000, () => {
  console.log('Buzz-Word-Bingo listening on port 3000!');
});