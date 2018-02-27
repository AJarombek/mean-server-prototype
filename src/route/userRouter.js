/**
 * Routes for the User API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');
const bcrypt = require('bcrypt');

const routes = (User) => {

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
                
                // Then hash and salt the password with bcrypt - second parameter is the salt rounds
                bcrypt.hash(user.password, 10).then((hash) => {
                    
                    user.password = hash;

                    insert().catch(error => res.status(500).send(error));
                    
                    async function insert() {
                        const newUser = await User.create(user);
                        console.info(`New User Created: ${newUser}`);

                        res.json(newUser);
                    }
                    
                }, (err) => {
                    console.error(err);
                    res.status(500).send(err);
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
                res.status(404).send("Error: No User found with give Username");
            }
        }
    });

    userRouter.route('/:username')
        .get((req, res) => {
            res.json(req.user);
        })
        .put((req, res) => {

            let user = req.user;

            user.first = req.body.first;
            user.last = req.body.last;

            if (user.password !== req.body.password) {
                console.info("Password Is Being Updated");

                bcrypt.hash(req.body.password, 10).then((hash) => {

                    user.password = hash;

                    update().catch(error => res.status(500).send(error));

                }, (err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
            } else {
                update().catch(error => res.status(500).send(error));
            }

            async function update() {
                const updatedUser = await User.save(user).exec();
                console.info(`Updated User: ${updatedUser}`);

                res.json(updatedUser);
            }
        })
        .delete((req, res) => {

            remove().catch(error => res.status(500).send(error));

            async function remove() {
                await user.remove();

                res.status(204).send();
            }
        });

    return userRouter;
};

module.exports = routes;