var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.js'
     },
     module: {
        rules: [
            { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader", options: { failOnError: true } },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
 };
