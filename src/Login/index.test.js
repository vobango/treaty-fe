import React from 'react';
import Login from './index';
import {render, screen} from '@testing-library/react';

describe('Login component', function() {
  it('should render without crashing', function() {
    render(<Login />);

    expect(screen.getByText(/log in to treaty/i)).toBeDefined();
  });
});
