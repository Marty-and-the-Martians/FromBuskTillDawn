const express = require('express');
const path = require('path');

const app = express();
// const queries = require('../database/schema.js'); // Emma's guide
const cors = require('cors');

app.use(express.static(path.resolve(__dirname, '../dist')));

// middleware
// use express.json for parsing JSON
app.use(express.json());
// parse form encoded data
app.use(express.urlencoded({ extended: true }));
// use cors middleware for enabling CORS with various options
app.use(cors());

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
