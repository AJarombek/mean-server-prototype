#!/usr/bin/env bash

# Add basic mongodb and express dependencies
npm init
npm install express --save
npm install mongoose --save
npm install body-parser --save

# Start up the basic server
node src/app.js