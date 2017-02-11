import React = require('react');
import ReactDOM = require('react-dom');
import _ = require('lodash');
import jQuery = require('jquery');

import { hashHistory, Router } from 'react-router';
import { globalFn } from '../shared/external';

import route from './route';
const mountPoint = document.getElementById('root');

ReactDOM.render(
    <Router history={hashHistory}>
        {route()}
    </Router>,
    mountPoint
);

globalFn('_', _);
globalFn('jQuery', jQuery);

require('bootstrap/dist/js/bootstrap.js');

/* require style */
require('bootstrap/dist/css/bootstrap.css');
require('./themes/root.scss');
