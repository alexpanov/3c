import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

export default () => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={App}
    />
  </Router>
);
