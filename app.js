'use strict';

var guardian_api = require("./guardian.js");

// [START app]
const express = require('express');

const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
//    res.status(200).send('Hello, world!').end();

    guardian_api.fetchTechNews()
        .then((response) => {
            res.render('home', { list: response }) 
        })
        .catch((error) => {
            res.status(500).send('Unexpected error').end();    
        });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
