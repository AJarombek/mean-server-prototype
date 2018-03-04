/**
 * Utils for handling JSON Web Tokens
 * @author Andrew Jarombek
 * @since 3/3/2018
 */

const expressJwt = require('express-jwt');
const path = require('path');
const fs = require('fs');

// Private key for the RS256 encryption signature
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../../private.key'));

exports.RSA_PRIVATE_KEY = RSA_PRIVATE_KEY;

// Middleware for dealing with JWT tokens on HTTP requests
exports.checkIfAuthenticated = expressJwt({
    secret: RSA_PRIVATE_KEY
});

module.exports = exports;