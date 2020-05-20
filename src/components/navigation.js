import React from 'react';
import {Route} from 'react-router-dom';

import * as ROUTES from '../utils/routes';
import LandingPage from '../pages/LandingPage';
import Entry from '../pages/Entry';
import AppAuth from '../authApp';
import Home from '../pages/Home';
import Layout from './layout';
import OfferWork from '../pages/OfferWork';
import ViewWork from '../pages/ViewWork';

const Navigation = () => {
  return (
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.ENTRY} component={Entry} />
      <Route exact path={ROUTES.APP} component={AppAuth} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path="/add" component={OfferWork} />
      <Route path="/listings" component={ViewWork} />
      <Route path="/settings">
        <Layout>
          <div>Kasutaja seaded</div>
        </Layout>
      </Route>
    </div>
  );
};

export default Navigation;
