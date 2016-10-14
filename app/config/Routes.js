import React from 'react';
import ReactRouter, { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from '../components/Main.js';
import Home from '../components/Home.js';
import Search from '../components/Search.js';
import DisplayContainer from '../containers/DisplayContainer.js';
import UserContainer from '../containers/UserContainer.js';

const Routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/display' component={DisplayContainer} />
      <Route path='/users/:username' component={UserContainer} />
    </Route>
  </Router>
);

export default Routes;
