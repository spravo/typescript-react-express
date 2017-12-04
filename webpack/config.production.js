'use strict';

const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./common');
const config = require('../config')(process.env.NODE_ENV);
const AssetsManifest = require('./plugins/assetsManifest');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[hash].css",
});

module.exports = function getProductionConfig (dirname) {
  return {
    entry: {
      app: path.join(config.SRC_CLIENT_FOLDER, 'index')
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          use: [ 'awesome-typescript-loader' ],
          include: config.SRC_CLIENT_FOLDER,
          exclude: path.resolve(dirname, 'node_modules')
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: common.scssLoader
          }),
          include: config.SRC_CLIENT_FOLDER,
          exclude: path.resolve(dirname, 'node_modules')
        }
      ]
    },
    plugins: [
      new AssetsManifest(),
      extractSass,
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          sequences: true,
          booleans: true,
          loops: true,
          unused: true,
          warnings: false,
          drop_console: true,
          unsafe: true
        }
      })
    ]
  };
};
