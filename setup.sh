#!/usr/bin/env bash

# Add basic mongodb and express dependencies
npm init
npm install express --save
npm install mongoose --save
npm install body-parser --save

# Start up the basic server
node src/app.js

npm install webpack --save
npm install babel-loader babel-core babel-preset-env --save
npm install webpack-node-externals start-server-webpack-plugin --save

# Run a build with webpack - will watch for changes and hot reload the server
npm run start:server

npm install webpack-dev-server --save
npm install clean-webpack-plugin --save