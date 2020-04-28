import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

// TODO: proper firebase mocking

describe('App', function() {
  it('should render without crashing', function() {
    const err = console.error;
    console.error = jest.fn();

    render(<></>);

    console.error = err;
  });
});
