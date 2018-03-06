/**
 * Routes for the Auth API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const jwtUtils = require('../utils/jwt');

const routes = (User) => {

    const authRouter = express.Router();

    authRouter.route('/login')
        .post((req, res) => {

            const username = req.body.username;
            const password = req.body.password;

            getToken().catch(error => {console.error(error); res.status(500).send(error)});

            async function getToken() {

                const user = await User.findOne({username: username}).exec();

                // Synchronously compare the password submitted and the hashed value in MongoDB
                if(bcrypt.compareSync(password, user.password)) {

                    console.info("Valid Username and Password Entered!");

                    // Create the JWT string for authentication
                    const jwtBearerToken = jwt.sign({}, jwtUtils.RSA_PRIVATE_KEY, {
                       algorithm: 'RS256',
                       expiresIn: 3600,
                       subject: user._id.toString()
                    });

                    // Send the client the JWT along with its expiration date
                    // Another popular option is to send JWT in a cookie instead of the HTTP body
                    res.status(200).json({
                        idToken: jwtBearerToken,
                        expiresIn: 3600
                    });

                } else {
                    res.status(401).send('Not Authorized');
                }
            }
        });

    return authRouter;
};

module.exports = routes;