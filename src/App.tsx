import React from 'react';
import {ReactQueryConfigProvider} from 'react-query';
import Login from './Login';
import {LocaleProvider} from './context/locale';
import logo from './assets/images/logo.png';

const queryConfig = {refetchAllOnWindowFocus: false};

const App: React.FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <LocaleProvider>
        <div className="text-gray-900 h-screen flex flex-col">
          <div className="mx-8 mt-6">
            <img src={logo} alt="cofind logo" />
          </div>
          <Login />
        </div>
      </LocaleProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;
