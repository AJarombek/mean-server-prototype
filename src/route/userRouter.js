/**
 * Routes for the User API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');

const routes = (User) => {

    const userRouter = express.Router();

    userRouter.route('/')
        .get((req, res) => {

            res.json({text: "User Route!"});
        });

    return userRouter;
};

module.exports = routes;