/**
 * Webpack configuration for the Node.js Express server.  Webpack is a module bundler that takes all the JavaScript
 * code in our node project and bundles it into one file.  We also add some plugins for ES5 transpilation and hot reload
 * @author Andrew Jarombek
 * @since 2/24/2018
 * @sources [https://webpack.js.org/concepts/]
 */

const path = require("path");

/**
 * entry - declares entry points for which modules webpack uses to begin building its dependency graph.  This dependency
 * graph allows webpack to bundle all the modules into one file.  Webpack searches for dependencies recursively from
 * the entry points specified
 * module - specify loaders which transform files before being bundled with webpack.  This is where babel transpiles
 * the files into ES5 in this project
 * plugins - in webpack plugins perform a wide range of tasks.  (ex. you can use them to hot reload modules when
 * the code changes).
 * output - where to emit the final bundle created by webpack
 */
module.exports = {
    entry: [
        'babel-polyfill',
        './src/app'
    ],
    target: "node",
    module: {
        rules: [{
            test: /\.js?$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "app.js"
    }
};