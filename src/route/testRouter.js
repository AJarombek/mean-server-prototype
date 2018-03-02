/**
 * Routes for the Test API - Use this route to test connections to MongoDB.
 * Other Node.js tests are performed here as well.
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const express = require('express');
const path = require('path');
const files = require('../utils/files');

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

    // Test out features with the filesystem
    testRouter.route('/files')
        .get((req, res) => {

            files.listFiles();

            res.status(200).send();
        });

    return testRouter;
};

module.exports = routes;