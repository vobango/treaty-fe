import React from 'react';
import { Route } from 'react-router-dom';

import * as ROUTES from '../../utils/routes';
import LandingPage from '../../LandingPage/index'
import Entry from "../../Entry";
import AppAuth from "../../authApp";

const Navigation = () => {
    return (
        <div>
            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route exact path={ROUTES.ENTRY} component={Entry}/>
            <Route exact path={ROUTES.APP} component={AppAuth}/>
        </div>
    )
};

export default Navigation;