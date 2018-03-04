/**
 * Routes for the User API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwtUtils = require('../utils/jwt');

const routes = (User, Audit) => {

    const userRouter = express.Router();

    userRouter.route('/')
        .get((req, res) => {

            find().catch(error => res.status(500).send(error));

            async function find() {
                const users = await User.find().exec();

                res.json(users);
            }
        })
        .post((req, res) => {

            const user = new User(req.body);
            console.info(`Creating User: ${user}`);

            // First make sure that the user exists and that it has a password
            if (user !== undefined && user.password) {

                // Then hash and salt the password with bcrypt - second parameter is the salt rounds, third is a
                // callback while in progress.  We pass null to automatically generate a salt and because we don't
                // need any progress updates
                bcrypt.hash(user.password, null, null, (err, hash) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(err);
                    } else {

                        user.password = hash;

                        console.info('About to call insert()');
                        insert(user).catch(() => res.status(500).send("User Creation Failed"));

                        // Then check that the username is available.  If not, send back an HTTP Bad Request 400 error.
                        // Otherwise continue with inserting the new user into the database
                        async function insert(user) {
                            console.info(`Username: ${user.username}`);
                            const existingUser = await User.findOne({username: user.username}).exec();
                            console.info(`User: ${user}`);

                            if (existingUser) {
                                console.info(`User already exists with username ${user.username}`);
                                res.status(400).send('Username already exists.');
                            } else {

                                // The username is available, so create the new user!
                                const newUser = await User.create(user);
                                console.info(`New User Created: ${newUser}`);

                                // Audit the creation of a new user
                                const audit = new Audit({
                                    object: newUser._id,
                                    type: 'user',
                                    message: `Created User ${newUser.username}`,
                                    source: 'NodeJS MeowCat API'
                                });

                                await Audit.create(audit);

                                res.status(201).json(newUser);
                            }
                        }
                    }
                });

            } else {
                res.status(500).send("Error: User must have a Password");
            }
        });

    userRouter.use('/:username', (req, res, next) => {

        findOne().catch(error => res.status(500).send(error));

        async function findOne() {
            const user = await User.findOne({username: req.params.username}).exec();
            console.info(`User with matching Username: ${user}`);

            // Only move on if the user exists
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send("Error: No User found with given Username");
            }
        }
    });

    // The HTTP PUT & DELETE requests for users are not public, valid JWT token must be present on HTTP request
    userRouter.route('/:username')
        .get((req, res) => {
            res.json(req.user);
        })
        .put(jwtUtils.checkIfAuthenticated, (req, res) => {

            let user = req.user;

            user.first = req.body.first;
            user.last = req.body.last;
            user.postCount = req.body.postCount;

            if (user.password !== req.body.password) {
                console.info("Password Is Being Updated");

                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(err);
                    } else {

                        user.password = hash;

                        update().catch(error => res.status(500).send(error));
                    }
                });

            } else {
                update().catch(error => res.status(500).send(error));
            }

            async function update() {
                // First update the user with the given username
                const update = await User.update({username: user.username}, user).exec();

                // Then find the newly updated user
                const updatedUser = await User.findOne({username: user.username}).exec();
                console.info(`Updated User: ${updatedUser}`);

                // Audit the edit of a user
                const audit = new Audit({
                    object: updatedUser._id,
                    type: 'user',
                    message: `Modified User ${updatedUser.username}`,
                    source: 'NodeJS MeowCat API'
                });

                await Audit.create(audit);

                res.json(updatedUser);
            }
        })
        .delete(jwtUtils.checkIfAuthenticated, (req, res) => {

            remove().catch(error => res.status(500).send(error));

            async function remove() {
                await req.user.remove();

                // Should return null if it was successfully deleted
                const deleted = await User.findOne({username: req.user.username}).exec();

                // Call the catch() function if the user was not deleted
                if (deleted !== null) {
                    throw Error('User Still Exists');
                }

                // Audit the deletion of a user
                const audit = new Audit({
                    object: req.user._id,
                    type: 'user',
                    message: `Deleted User ${req.user.username}`,
                    source: 'NodeJS MeowCat API'
                });

                await Audit.create(audit);

                res.status(204).send();
            }
        });

    return userRouter;
};

module.exports = routes;