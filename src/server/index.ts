import * as express from 'express';
import wds from './wds';
import ssr from './ssr';

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

const isDevelopment = process.env.NODE_ENV === 'development';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = isDevelopment;
global.__TEST__ = false;

const config = require('../../config')(process.env.NODE_ENV);
const app = express();

if (isDevelopment) {
  wds(app);
} else {
  app.use(config.PUBLIC_PATH, express.static(config.PUBLIC_FOLDER));
}

app.get('*', ssr);

app.listen(config.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('===> Starting Server . . .');
  console.log('===> Port: ' + config.PORT);
  console.log('===> Environment: ' + process.env.NODE_ENV, ', isDevelopment', isDevelopment);
});
