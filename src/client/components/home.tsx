import * as React from 'react';
import Helmet from 'react-helmet';

export default class Home extends React.Component {
  public render () {
    return (
      <div>
        <Helmet title='Home' />
        Home
      </div>
    );
  }
}
