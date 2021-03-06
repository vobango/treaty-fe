import React from 'react';
import {Route} from 'react-router-dom';

import * as ROUTES from '../utils/routes';
import LandingPage from '../pages/LandingPage';
import Entry from '../pages/Entry';
import AppAuth from '../authApp';
import Home from '../pages/Home';
import Payment from '../pages/Payment';
import PaymentSuccess from '../pages/PaymentSuccess';
import Layout from './layout';
import OfferWork from '../pages/OfferWork';
import ViewWork from '../pages/ViewWork';
import Eula from '../pages/Eula';
import {ListingStateProvider} from '../providers/newListing';

const Navigation = () => {
  return (
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.ENTRY} component={Entry} />
      <Route exact path={ROUTES.APP} component={AppAuth} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.EULA} component={Eula} />
      <Route path={ROUTES.ADD}>
        <ListingStateProvider>
          <OfferWork />
        </ListingStateProvider>
      </Route>
      <Route path={ROUTES.LISTINGS} component={ViewWork} />
      <Route path={ROUTES.SETTINGS}>
        <Layout>
          <div>Kasutaja seaded</div>
        </Layout>
      </Route>
      <Route path={ROUTES.PAYMENT} component={Payment} />
      <Route path={ROUTES.PAYMENT_SUCCESS} component={PaymentSuccess} />
    </div>
  );
};

export default Navigation;
