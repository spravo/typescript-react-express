var isProduction    = process.env.NODE_ENV == 'production';
var client          = require('./webpack.client.config');
var webpack         = require('webpack');
var path            = require('path');
var fs              = require('fs');

function server() {
    var nodeModules = {};
    fs.readdirSync('node_modules')
        .filter(function(x) {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach(function(mod) {
            nodeModules[mod] = 'commonjs ' + mod;
        });

    return {
        name: 'server',
        context: __dirname,
        entry: './src/server/index.ts',
        externals: nodeModules,
        target: 'node',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: [ '', '.js', '.ts' ]
        },
        module: {
            loaders: [
                { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }
            ]
        }
    }
}

var configs = [ server() ];

if (isProduction)
    configs.push(client);

module.exports = configs;
