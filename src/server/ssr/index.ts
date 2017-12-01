import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as React from 'react';
import * as _ from 'lodash';

import * as ReactDOMServer from 'react-dom/server';

const existsP = util.promisify(fs.exists);
const readFileP = util.promisify(fs.readFile);

import { Html } from './html';
import { Component, IComponentConfig } from './component';
import { configureStore } from '../../client/store';

const config = require('../../../config')(process.env.NODE_ENV);

// function configureHTML(template: string, component: string, state): string {
//   let document: string = null;

//   // Inserts the rendered React HTML into main div
//   document = template.replace(
//     /<div id="root"><\/div>/,
//     `<div id="root">${component}</div>`
//   );

//   // WARNING: See the following for security issues around embedding JSON in HTML:
//   // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
//   document = document.replace(
//     '__PRELOADED_STATE__  = {}',
//     `__PRELOADED_STATE__  = ${JSON.stringify(state).replace(/</g, '\\u003c')}`
//   );

//   return document;
// }

export default function serverSideRender (req: express.Request, res: express.Response, next: express.NextFunction) {
  // global.navigator = { userAgent: req.headers['user-agent'] };
  const componentConfig: IComponentConfig = {
    routerContext: {},
    preloadStore: { items: [] },
    locationUrl: req.url
  };
 
  // Renders our App component into an HTML string
  const template = ReactDOMServer.renderToString(React.createElement(Component, {
    config: componentConfig
  }));
  // let templatePath = path.join(config.PUBLIC_FOLDER, 'index.html');

  if (componentConfig.routerContext.url) {
    res.writeHead(301, { Location: componentConfig.routerContext.url });
    res.end();
    return;
  }

  res.send(
    '<!doctype html>\n' +
    ReactDOMServer.renderToString(React.createElement(Html, {
      content: template,
      store: configureStore(componentConfig.preloadStore),
      assets: res.locals.webpackStats.toJson().assetsByChunkName,
      publicPath: config.PUBLIC_PATH,
      // any: res.locals.webpackStats.toJson()
    }))
  );

  // existsP(path.join(config.PUBLIC_FOLDER, 'index.html'))
  //   .then((exists) => {
  //     if (!exists) {
  //       templatePath = path.join(config.SRC_FOLDER, 'client/index.html')
  //     }

  //     return readFileP(templatePath, 'utf8');
  //   })
  //   .then((template) => {
  //     res.send(
  //       '<!doctype html>\n' +
  //       ReactDOMServer.renderToString(React.createElement(Html, {
  //         content: mockup,
  //         store: configureStore(componentConfig.preloadStore)
  //       }))
  //     );
  //   })
  //   .catch((e) => next(e));
}
