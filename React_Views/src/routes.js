import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import DealerPage from './components/DealerPage';
import CustomerPage from './components/CustomerPage';

export default (
  <Route path="/" component={App}>
    <Route component={DealerPage}/>
  </Route>
);
