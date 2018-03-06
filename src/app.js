/**
 * Configure the express server and node.js application
 * @author Andrew Jarombek
 * @since 2/23/2018
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const Post = require('./model/post');
const User = require('./model/user');
const Test = require('./model/test');
const Audit = require('./model/audit');

const userRouter = require('./route/userRouter')(User, Audit);
const postRouter = require('./route/postRouter')(Post, User, Audit);
const authRouter = require('./route/authRouter')(User);
const testRouter = require('./route/testRouter')(Test);

// Mongoose 5.0 uses native JS Promises by default (less config needed!)
mongoose.connect('mongodb://127.0.0.1/meowcat');

const app = express();

// Set a larger payload limit for HTTP requests since some image data will be large
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

// Helps protect our API endpoint from well known web security vulnerabilities
app.use(helmet({}));

const port = process.env.port || 3000;

app.use('/api/test', testRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
   res.send(JSON.parse('{"title":"Welcome to the Apps API!"}'));
});

module.exports = app.listen(port, () => {
   console.info(`Started MeowCat API on port ${port}`);
});