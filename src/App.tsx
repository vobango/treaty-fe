import React from 'react';
import Login from './Login';
import {LocaleProvider} from './context/locale';

const App: React.FC = () => {
  return (
    <LocaleProvider>
      <div className="text-gray-900 h-screen flex flex-col">
        <h1>CoFind logo</h1>
        <Login />
      </div>
    </LocaleProvider>
  );
};

export default App;
