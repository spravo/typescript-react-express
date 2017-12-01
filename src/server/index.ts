import * as express from 'express';
import { request } from 'http';

// import ssrController from './ssr';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig  = require('../../webpack.config');

const compiler = webpack(webpackConfig);

const config = require('../../config')(process.env.NODE_ENV);
const app = express();

// Serve hot-reloading bundle to client
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true
}));
app.use(webpackHotMiddleware(compiler));

// routers
app.get('*', (req, res, next) => {
  require('./ssr').default(req, res, next);
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', () => {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache)
    .filter((id) => /client/.test(id) || /ssr/.test(id))
    .forEach((id) => {   
      console.log(id)
      delete require.cache[id];
    });
});


// app.use(config.PUBLIC_PATH, express.static(config.PUBLIC_FOLDER, { index: false }));

// app.use((req, res, next) => {
//   console.log(res.locals.webpackStats);
//   console.log(res.locals.webpackStats.toJson().assetsByChunkName)
//   next()
// })

app.listen(config.PORT, (err) => {
  if (err) throw err;

  console.log('===> Starting Server . . .');
  console.log('===> Port: ' + config.PORT);
  console.log('===> Environment: ' + process.env.NODE_ENV);
});
