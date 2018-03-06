/**
 * Utils for handling JSON Web Tokens
 * @author Andrew Jarombek
 * @since 3/3/2018
 */

const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const path = require('path');
const fs = require('fs');

// Private key for the RS256 encryption signature
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../../private.key'));

exports.RSA_PRIVATE_KEY = RSA_PRIVATE_KEY;

// Public key for the RS256 encryption signature
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../../private.key.pub'));

exports.RSA_PUBLIC_KEY = RSA_PUBLIC_KEY;

// Middleware for dealing with JWT tokens on HTTP requests
// Public keys are published on a REST endpoint using JWKS (JSON Web Key Set)
/*
exports.checkIfAuthenticated = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true, // Prevent retrieving the public key each time.  A key will be kept for 10 hours
        rateLimit: true, // Don't make more than 10 requests per minute to the public key server
        jwksUri: "https://jarombek.auth0.com/.well-known/jwks.json"
    }),
    algorithms: ['RS256']
});*/

exports.checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY
});

module.exports = exports;