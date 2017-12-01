import * as React from 'react';
import * as Promise from 'promise';

import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Link, Route } from 'react-router-dom';

const Two = () => (
  <div>
    <h2>+Two</h2>
  </div>
)

const One = () => (
  <div>
    <Redirect exact from={'/'} to={'/redirect'}/>
  </div>
)

const Three = () => (
  <div>
    <h2>three</h2>
  </div>
)

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h2>React render</h2>
        <h2>React render 24</h2>
        <div>
          <Link to='/one'>one</Link>
        </div>
        <div>
          <Link to='/two'>two</Link>
        </div>
        <Link to='/three'>three</Link>

        <Route path='/one' component={One} />
        <Route path='/two' component={Two} />
      </div>
    );
  }
}
