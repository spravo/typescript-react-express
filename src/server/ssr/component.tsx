import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import AppComponent from '../../client/app';
import { configureStore } from '../../client/store';

export interface IComponentConfig {
  preloadStore: any;
  routerContext: {
    url?: string;
    action?: string;
    location?: any;
  };
  locationUrl: string; 
}

interface IComponentProps {
  config: IComponentConfig;
}

export function Component ({ config }: IComponentProps) {
  return (
    <Provider store={configureStore(config.preloadStore)}>
      <StaticRouter
        context={config.routerContext}
        location={config.locationUrl}
      >
        <AppComponent />
      </StaticRouter>
    </Provider>
  );
}
