import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe('App', function() {
  it('should render without crashing', function() {
    render(<App />);
  });
});
