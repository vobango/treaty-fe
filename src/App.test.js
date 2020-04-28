import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe('App', function() {
  it('should render without crashing', function() {
    const err = console.error;
    console.error = jest.fn();

    render(<App />);

    console.error = err;
  });
});
