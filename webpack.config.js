'use strict';

const _ = require('lodash');

function mergeWebpackConfigHelper(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const configList = {
  development: require('./webpack/config.development'),
  common: require('./webpack/config.common'),
  production: require('./webpack/config.production')
}

/**
 * @param {string} env
 * @return {object}
 */
function getConfig (env) {
  if (_.isUndefined(env)) {
    throw new Error('Can\'t find local environment variable via process.env.NODE_ENV');
  }

  if (_.isUndefined(configList[env]) || env === 'common') {
    throw new Error('Can\'t find environments see configList object');
  }

  return _.mergeWith(
    {},
    configList[env](__dirname),
    configList.common(__dirname),
    mergeWebpackConfigHelper
  );
}

module.exports = getConfig(process.env.NODE_ENV);
