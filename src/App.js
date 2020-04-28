import React from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import {LocaleProvider} from './context/locale';
import {BrowserRouter as Router} from 'react-router-dom';
import {withAuthentication} from './components/Session';

import Navigation from './components/Navigation/index';

const queryConfig = {refetchAllOnWindowFocus: false};

const App = () => {
  if (!window.IntersectionObserver) require('intersection-observer');

  return (
    <Router>
      <ReactQueryConfigProvider config={queryConfig}>
        <LocaleProvider>
          <div className="text-gray-900 h-screen flex flex-col">
            <Navigation />
          </div>
        </LocaleProvider>
      </ReactQueryConfigProvider>
    </Router>
  );
};

export default withAuthentication(App);
