import express  = require('express');
import path     = require('path');

var webpack             = require('webpack');
var devServer           = require('webpack-dev-middleware');
var hotServer           = require('webpack-hot-middleware');
var webpackConfig       = require('../../webpack.client.config');

export default function linkStaticFiles(app: express.Application) {
    const isProduction = process.env['NODE_ENV'] == 'production';

    if (isProduction) {
        const pathPublicFolder = path.join(path.resolve(path.dirname('')), 'public');
        app.use(express.static(pathPublicFolder));
    } else {
        var compiler = webpack(webpackConfig);

        app.use(devServer(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true,
                chunks: false,
                'errors-only': true,
            }
        }));
        app.use(hotServer(compiler, {
            log: console.log
        }));
    }

    return app;
}
