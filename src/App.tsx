import React from 'react';
import Login from './Login';

const App: React.FC = () => {
  return (
    <div className="text-gray-900 h-screen flex flex-col">
      <h1>CoFind logo</h1>
      <Login />
    </div>
  );
};

export default App;
