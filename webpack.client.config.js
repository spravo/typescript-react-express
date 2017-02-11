var webpack             = require('webpack');
var path                = require('path');
var fs                  = require('fs');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');

var pathPublicFolder = path.join(path.resolve(path.dirname('')), 'public');
var entry = './src/client/index.tsx';

var commonLoaders = [
    { test: /\.tsx?$/, loaders: [ 'react-hot', 'ts-loader' ] },
    { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'file' },
    { test: /\.(ttf|woff2?|eot)(\?.*)?$/, loader: 'file' }
];

function client() {
    var configuration = {
        name: 'client',
        target: 'web',
        entry: [ entry ],
        resolve: {
            extensions: [ '', '.ts', '.tsx', '.js', '.json', '.css', '.scss', '.less' ]
        },
        module: {
            loaders: commonLoaders.concat([
                {
                    test: /\.(sc|c)ss$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass?includePaths[]=' + encodeURIComponent(path.resolve(pathPublicFolder, 'styles')))
                }
            ])
        },
        output: {
            path: pathPublicFolder,
            publicPath: '/',
            filename: 'bundle.js'
        },
        plugins: [
            new ExtractTextPlugin('bundle.css'),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        ]
    };

    if (process.env.NODE_ENV === 'development') {
        configuration.entry = [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&&quiet=true&reload=true&noInfo=true',
            entry
        ];

        configuration.devtool = 'source-map';

        configuration.module = {
            loaders: commonLoaders.concat([
                { test: /\.s?css$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ] },
                { test: /\.less$/,  loaders: [ 'style', 'css?sourceMap', 'less' ] }
            ]),
            preLoaders: [
                { test: /\.js$/, loader: 'source-map-loader' }
            ]
        };

        configuration.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        ];
        }

    return configuration;
}

module.exports = client();
