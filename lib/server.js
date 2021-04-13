'use strict';

// Bring in third-party libraries
const express = require('express');
const cors = require('cors');

// Set up new instance of express
const app = express();

// express API routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World')
});

module.exports = {
  start: (port) => app.listen(port, () => console.log(`server up on ${port}`)),
  app,
};