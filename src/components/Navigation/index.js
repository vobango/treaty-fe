import React from 'react';
import {Route} from 'react-router-dom';

import * as ROUTES from '../../utils/routes';
import LandingPage from '../../LandingPage/index';
import Entry from '../../Entry';
import AppAuth from '../../authApp';
import Home from '../home';
import Layout from '../layout';

const Navigation = () => {
  return (
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.ENTRY} component={Entry} />
      <Route exact path={ROUTES.APP} component={AppAuth} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path="/add">
        <Layout>
          <div>Kuulutuse lisamine</div>
        </Layout>
      </Route>
      <Route path="/listings">
        <Layout>
          <div>Kuulutuste vaatamine</div>
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <div>Kasutaja seaded</div>
        </Layout>
      </Route>
    </div>
  );
};

export default Navigation;
