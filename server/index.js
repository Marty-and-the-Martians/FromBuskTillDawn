const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const router = require('./routes');
// const queries = require('../database/schema.js'); // Emma's guide

const app = express();
// host the bundle
app.use(express.static(path.resolve(__dirname, '../dist')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// if data is coming in as an empty object, consider exetneded: true

app.use(cors());

// DB Config
const db = require('../config/keys').mongoURI;

// router
app.use('/', router);

// Mongo Connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongo DB hath done a connect'))
  .catch((err) => console.log('MonGod said no. This is why: ', err));

// set port where server will listen
const port = 3000;

// tell server to listen on predefined port
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
