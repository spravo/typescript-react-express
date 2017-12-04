import { compose, createStore, applyMiddleware, Store, Middleware } from 'redux';

import { reducer } from '../reducers';
import { asyncMiddleware } from '../model/middleware';

export function configureStore (initStore: {} = {}) {
  let composeEnhancers = compose;
  const enhancers: any[] = [];
  const middleware: Middleware[] = [
    asyncMiddleware()
  ];

  if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    reducer,
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
