'use strict';

const path = require('path');

function config (environment = 'production') {
  const SRC_FOLDER = path.resolve(__dirname, '..', 'src');

  return {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    SRC_FOLDER: SRC_FOLDER,
    PUBLIC_PATH: '/static/',
    PUBLIC_FOLDER: path.resolve(__dirname, '..', 'public'),
    SRC_CLIENT_FOLDER: path.join(SRC_FOLDER, 'client')
  };
}

module.exports = config;
