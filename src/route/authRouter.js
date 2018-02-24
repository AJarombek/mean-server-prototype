/**
 * Routes for the Auth API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');

const routes = () => {

    const authRouter = express.Router();

    authRouter.route('/')
        .get((req, res) => {

            res.json({text: "Auth Route!"});
        });

    return authRouter;
};

module.exports = routes;