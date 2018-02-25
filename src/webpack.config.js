/**
 * Webpack configuration for the Node.js Express server.  Webpack is a module bundler that takes all the JavaScript
 * code in our node project and bundles it into one file.  We also add some plugins for ES5 transpilation and hot reload
 * @author Andrew Jarombek
 * @since 2/24/2018
 * @sources [https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0, https://webpack.js.org/concepts/]
 */

const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

/**
 * entry - declares entry points for which modules webpack uses to begin building its dependency graph.  This dependency
 * graph allows webpack to bundle all the modules into one file.  Webpack searches for dependencies recursively from
 * the entry points specified
 * module - specify loaders which transform files before being bundled with webpack.  This is where babel transpiles
 * the files into ES5 in this project
 * plugins - in webpack plugins perform a wide range of tasks.  In this project, we use them to hot reload modules when
 * the code changes.
 * output - where to emit the final bundle created by webpack
 */
module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/app'
    ],
    watch: true,
    target: "node",
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [{
            test: /\.js?$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new StartServerPlugin('app.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('app')
            }
        })
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: "app.js"
    }
};