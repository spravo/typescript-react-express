'use strict';

const path = require('path');

function config (environment = 'development') {
  return {
    PORT: process.env.PORT || 3000,
    SRC_FOLDER: path.resolve(__dirname, '..', 'src'),
    PUBLIC_PATH: '/static',
    PUBLIC_FOLDER: path.resolve(__dirname, '..', 'public')
  };
}

module.exports = config;
