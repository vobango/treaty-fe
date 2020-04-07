import React from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import Entry from './Entry';
import {LocaleProvider} from './context/locale';
import UserProvider from './providers/UserProvider';

const queryConfig = {refetchAllOnWindowFocus: false};

const App = () => {
  return (
    <UserProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        <LocaleProvider>
          <div className="text-gray-900 h-screen flex flex-col">
            <Entry />
          </div>
        </LocaleProvider>
      </ReactQueryConfigProvider>
    </UserProvider>
  );
};

export default App;
