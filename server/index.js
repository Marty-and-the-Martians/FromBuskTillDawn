const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./routes');
// const queries = require('../database/schema.js'); // Emma's guide

const app = express();
// host the bundle
app.use(express.static(path.resolve(__dirname, '../dist')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router
app.use('/', router);

// get entries  -- from Emma's guide -- mongodb connection required
// app.get('/entries', (req, res) => {
//  queries.getEntry(req.query.name, (err, entry) => {
//    if (err) {
//      res.status(404).send(err);
//    } else {
//      res.status(200).send(entry);
//    }
//  })
// });

// set port where server will listen
const port = 3000;

// tell server to listen on predefined port
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
