/**
 * Routes for the Post API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');

const routes = (Post) => {

    const postRouter = express.Router();

    postRouter.route('/')
        .get((req, res) => {

            res.json({text: "Post Route!"});
        });

    return postRouter;
};

module.exports = routes;