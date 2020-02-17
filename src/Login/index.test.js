import React from 'react';
import Login from './index';
import {screen} from '@testing-library/react';
import {renderWithLocale} from '../testUtils';

describe('Login component', function() {
  const renderLogin = () => {
    renderWithLocale(<Login />);
  };
  it('should render without crashing', function() {
    renderLogin();

    expect(screen.getByText(/log in to cofind/i)).toBeDefined();
  });

  it('should display an input for username', function() {
    renderLogin();

    expect(screen.getByLabelText(/username/i)).toBeDefined();
  });

  it('should display an input for password', function() {
    renderLogin();

    expect(screen.getByLabelText(/password/i)).toBeDefined();
  });

  it('should display a button to submit the login form', function() {
    renderLogin();
    const submit = screen.getByRole('button');

    expect(submit).toHaveTextContent(/login/i);
  });
});
