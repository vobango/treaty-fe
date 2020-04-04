import React from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import LandingPage from './LandingPage';
import Entry from './Entry';
import {LocaleProvider} from './context/locale';

const queryConfig = {refetchAllOnWindowFocus: false};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <LocaleProvider>
        <div className="text-gray-900 h-screen flex flex-col">
          <Entry />
        </div>
      </LocaleProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;
