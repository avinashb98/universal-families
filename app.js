require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Routers
const universeRouter = require('./src/routes/universe');
const familyRouter = require('./src/routes/family');
const personRouter = require('./src/routes/person');
const originRouter = require('./src/routes/origin');
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

app.use('/v1/universe/', universeRouter);
app.use('/v1/family/', familyRouter);
app.use('/v1/person/', personRouter);
app.use('/v1/origin/', originRouter);

module.exports = app;
