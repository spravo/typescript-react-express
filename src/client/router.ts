import { RouteConfig } from 'react-router-config';

import Root from './root';
import Items from './components/items';
import NotFound from './components/notFound';
import Home from './components/home';

export const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/items',
        component: Items
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];
