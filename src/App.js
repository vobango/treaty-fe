import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navigation from './components/navigation';

const App = () => {
  if (!window.IntersectionObserver) require('intersection-observer');

  return (
    <Router>
      <div className="text-gray-900 h-screen flex flex-col">
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
