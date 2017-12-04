'use strict';

const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';
const autoprefixer = require('autoprefixer');

module.exports = {
  scssLoader: [
    {
      loader: 'css-loader',
      options: {
        minimize: !isDevelopment,
        sourceMap: isDevelopment
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDevelopment,
        plugins: [
          autoprefixer({
            browsers:['ie >= 8', 'last 4 version']
          })
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: isDevelopment
      }
    }
  ]
};
