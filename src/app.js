/**
 * Configure the express server and node.js application
 * @author Andrew Jarombek
 * @since 2/23/2018
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Mongoose 5.0 uses native JS Promises by default (less config needed!)
mongoose.connect('mongodb://127.0.0.1/meowcat');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.get('/', (req, res) => {
   res.send(JSON.parse('{"title":"Welcome to the MeowCat API!"}'));
});

app.listen(port, () => {
   console.info(`Started MeowCat API on port ${port}`);
});