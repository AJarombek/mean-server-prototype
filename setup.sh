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