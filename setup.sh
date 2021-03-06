#!/usr/bin/env bash

# Add basic mongodb and express dependencies
npm init
npm install express --save
npm install mongoose --save
npm install body-parser --save

# Start up the basic server
node src/app.js

# Install webpack and babel dependencies
npm install webpack --save
npm install babel-loader babel-core babel-preset-env --save

# node-dev restarts the node process when a file is modified
# https://github.com/fgnass/node-dev
npm install -g node-dev

# webpack-node-dev allows us to easily hook up our webpack/babel bundler/transpile process to node-dev
# https://www.npmjs.com/package/webpack-node-dev
npm i -D webpack-node-dev

# Run a build with webpack - when a change occurs node-dev will restart the node process
# start:dev is declared as an npm script in package.json
npm run start:dev

# Install mocha for unit testing
npm install mocha --save-dev

# Supertest allows us to test HTTP REST endpoints
npm install supertest --save-dev

# Run the test suite
npm run test

# Istanbul and coveralls are used for code coverage reports
npm install istanbul --save-dev

npm run cover

npm install coveralls mocha-lcov-reporter --save-dev

# Babel polyfill is needed to use async functions
npm install babel-polyfill --save-dev

# We will use bcrypt to hash and salt the users passwords
npm install bcrypt-nodejs

# Helmet helps protect Node.js from well known security vulnerabilities
# https://expressjs.com/en/advanced/best-practice-security.html
npm install helmet --save

# Dependency used to setup JSON Web Token user authentication
npm install jsonwebtoken --save

# Generate a new RS256 key for a JSON Web Token
# https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
# ssh-keygen is used for creating auth pairs for SSH
# https://www.ssh.com/ssh/keygen/
ssh-keygen -t rsa -b 4096 -f private.key

# Generate public key from the private key
openssl rsa -in private.key -pubout -outform PEM -out private.key.pub

# Handle middleware commonly used with JWT
npm install express-jwt --save

# Retrieve RSA signing keys from JWKS (JSON Web Key Set) endpoint.  This allows keys to rotate
npm install jwks-rsa --save

# When you encounter this error: Error: listen EADDRINUSE :::3000
# Make sure to kill the process running node
pkill node