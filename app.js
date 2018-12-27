require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

require('./config/db');

// Initializing express app
const app = express();

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));


// Router Initialization
app.get('/v1', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Universal Families API'
  });
});

module.exports = app;
