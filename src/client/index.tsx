import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { configureStore } from './store';
import { AppContainer } from 'react-hot-loader'

const element = document.getElementById('root');
const preloadedState = window.__PRELOADED_STATE__;;
const store = configureStore(preloadedState);

delete window.__PRELOADED_STATE__;

function render (Component: typeof App) { 
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  , element);
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', function () {
    const NextApp: typeof App = require('./app').default;
    render(NextApp);
  });
}
