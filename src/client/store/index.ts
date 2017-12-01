import { compose, createStore, applyMiddleware, Store, Middleware } from 'redux';

import reducers from '../reducers';

export function configureStore (initStore: {} = {}) {
  let composeEnhancers = compose;
  const enhancers: Array<any> = [];
  const middleware: Array<Middleware> = [
  ];

  if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    reducers,
    initStore,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
