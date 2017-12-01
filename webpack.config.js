'use strict';

const path = require('path');
const webpack = require("webpack");

const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('./config')(process.env.NODE_ENV);
const vendors = require('./webpack/vendor');

const ENTRY_PATH = path.resolve(__dirname, 'src/client');

var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

module.exports = {
  devtool: 'inline-source-map',
  target: 'web',
  context: path.resolve(__dirname),
  entry: {
    app: [
      "react-hot-loader/patch",
      path.join(ENTRY_PATH, 'index'),
      'webpack-hot-middleware/client',
      'webpack/hot/dev-server',
    ],
    vendor: vendors
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    path: config.PUBLIC_FOLDER,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.PUBLIC_PATH
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
        ],
        // loader: 'awesome-typescript-loader',
        include: ENTRY_PATH,
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CleanPlugin(config.PUBLIC_FOLDER),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // new HtmlPlugin({
    //   chunks: [ 'app', 'vendor', 'manifest' ],
    //   filename: 'index.html',
    //   template: path.join(ENTRY_PATH, 'index.html')
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
