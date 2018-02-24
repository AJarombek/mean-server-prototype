/**
 * Configure the express server and node.js application
 * @author Andrew Jarombek
 * @since 2/23/2018
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Post = require('./model/post');
const User = require('./model/user');

const userRouter = require('./route/userRouter')(User);
const postRouter = require('./route/postRouter')(Post);
const authRouter = require('./route/authRouter')();

// Mongoose 5.0 uses native JS Promises by default (less config needed!)
mongoose.connect('mongodb://127.0.0.1/meowcat');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
   res.send(JSON.parse('{"title":"Welcome to the MeowCat API!"}'));
});

app.listen(port, () => {
   console.info(`Started MeowCat API on port ${port}`);
});