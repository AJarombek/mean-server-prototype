/**
 * Routes for the Test API - Use this route to test connections to MongoDB
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const express = require('express');

const routes = (Test) => {

    const testRouter = express.Router();

    testRouter.route('/')
        .get((req, res) => {

            run().catch(error => res.status(500).send(error));

            // New in Mongoose 5.0 - Using async functions to await MongoDB queries!
            async function run() {
                const test = await Test.find().exec();

                res.json(test);
            }
        });

    return testRouter;
};

module.exports = routes;