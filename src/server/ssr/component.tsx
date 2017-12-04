import * as React from 'react';
import * as _ from 'lodash';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderRoutes, matchRoutes } from 'react-router-config';

import { routes } from '../../client/router';
import { configureStore } from '../../client/store';

export interface IComponentConfig {
  store: Store<any>;
  routerContext: {
    url?: string;
    action?: string;
    location?: any;
    status?: number;
  };
  locationUrl: string;
}

interface IComponentProps {
  config: IComponentConfig;
}

export function Component ({ config }: IComponentProps) {
  return (
    <Provider store={config.store}>
      <StaticRouter
        context={config.routerContext}
        location={config.locationUrl}
      >
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );
}

export function getStore (): Store<any> {
  return configureStore();
}

export function fetchData (url: string, store: Store<any>) {
  const branch = matchRoutes(routes, url);

  const promises = branch.map(({ route, match }) => {
    const fetchDataPromise = _.get(route, 'component.fetchData');

    return fetchDataPromise instanceof Function
      ? fetchDataPromise(store, match)
      : Promise.resolve(null);
  });

  return promises;
}
