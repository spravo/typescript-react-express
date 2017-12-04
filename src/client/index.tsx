import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';

import 'isomorphic-fetch';
import './styles/index.scss';

import { routes } from './router';
import { configureStore } from './store';

const element = document.getElementById('root');
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

delete window.__PRELOADED_STATE__;

function render (route: RouteConfig[]) {
  const childContent = (
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(route)}
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );

  ReactDOM.hydrate(childContent, element);
}

render(routes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router', () => {
    const newRoutes = require('./router').routes;
    render(newRoutes);
  });
}
