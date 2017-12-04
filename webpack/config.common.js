'use strict';

const path = require('path');
const webpack = require("webpack");

const config = require('../config')(process.env.NODE_ENV);
const vendors = require('./vendor');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function getConfig(dirname) {
  return {
    target: 'web',
    context: path.resolve(dirname),
    entry: {
      vendor: vendors
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.scss', '.css' ]
    },
    output: {
      path: config.PUBLIC_FOLDER,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: config.PUBLIC_PATH
    },
    module: {
      loaders: []
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        },
        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: NODE_ENV === 'development',
        __TEST__: false
      })
    ]
  };
};
