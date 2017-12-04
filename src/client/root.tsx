import * as React from 'react';
import Helmet from 'react-helmet';

import { Redirect, Link, Route } from 'react-router-dom';
import itemsComponent from './components/items';
import { renderRoutes, RouteConfig } from 'react-router-config';

interface IRootProps {
  route: {
    routes: RouteConfig[];
  };
}

export default class Root extends React.Component<IRootProps, any> {
  public render () {
    const APP_NAME = 'any app name';
    return (
      <div>
        <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
        <p><Link to='/'>Home</Link></p>
        <p><Link to='/items'>items</Link></p>
        <p><Link to='/not-found'>Not Found</Link></p>
        <hr />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}
