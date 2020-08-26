'use strict';

const express = require('express');
const path = require('path');
const mongoose = require("mongoose")
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://mongo:27017/mernapp_dev"

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true }) // Adding new mongo url parser
  .then(() => {
    // Constants
    const PORT = process.env.PORT || 8080;
    const HOST = '0.0.0.0';

    const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

    // App
    const app = express();

    // Static files
    app.use(express.static(CLIENT_BUILD_PATH));

    // API
    app.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      let data = {
        message: 'Hello world, SDM Team 8 is coming!!!!'
      };
      res.send(JSON.stringify(data, null, 2));
    });

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
      response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
    });

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  })
  .catch(err => console.log(err));
