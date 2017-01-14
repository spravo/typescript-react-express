import React = require('react');
import ReactDOM = require('react-dom');
import { hashHistory, Router } from 'react-router';

import route from './route';
const mountPoint = document.getElementById('root');

ReactDOM.render(
    <Router history={hashHistory}>
        {route()}
    </Router>,
    mountPoint
);

require('./themes/root.scss')
