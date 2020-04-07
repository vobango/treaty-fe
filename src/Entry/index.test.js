import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import faker from 'faker';
import fetch from 'jest-fetch-mock';
import {renderWithLocale} from '../testUtils';
import Entry from './index';

// TODO: Uncomment tests, reimplement with new components
// TODO: Localization tests. https://testing-library.com/docs/example-react-intl
describe('Entry component', function() {
  const renderLogin = () => {
    renderWithLocale(<Entry />);
  };

  it('should render without crashing', function() {
    renderLogin();
  });

  it('should render neccesary components', function() {
    renderLogin();
    expect(screen.getByText('Login'));
    expect(screen.getByText('Sign up'));
    expect(screen.getByText('To start, make a choice'));
    expect(screen.getByText('EST'));
  });

  describe('Login flow', function() {
        it('should display loginScreen', async function() {
          renderLogin();

          // Choose login form
          await fireEvent.click(screen.getByText('Login'));

          expect(screen.getByText('Email:')).toBeInTheDocument();
          expect(screen.getByText('Password:')).toBeInTheDocument();
          expect(screen.getByText('Sign in')).toBeInTheDocument();
        });
    // it('should display an error message when login fails', async function() {
    //   renderLogin();
    //
    //   // Choose login form
    //   await fireEvent.click(screen.getByText(/login/i));
    //
    //   const errorMessage = faker.random.word();
    //   fetch.mockRejectOnce(() => Promise.reject({message: errorMessage}));
    //
    //   // Submit login form
    //   await fireEvent.click(screen.getByText(/login/i));
    //
    //   // Wait until HTTP call resolves
    //   const error = await screen.findByText(errorMessage, {exact: false});
    //
    //   expect(error).toBeInTheDocument();
    // });
    /* it('should be able to switch to register form from login', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(/login/i));

      // Switch to register form
      await fireEvent.click(screen.getByText(/sign up instead/i));

      // Search for text only visible in the register form
      expect(screen.getByText(/create new user/i)).toBeInTheDocument();
    });*/
  });

  describe('Register flow', function() {
    // it('should display inputs for username, password and password repeat', async function() {
    //   renderLogin();
    //
    //   // Choose register form
    //   await fireEvent.click(screen.getByText(/new user/i));
    //
    //   expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    //   expect(screen.getAllByLabelText(/password/i, {exact: false}).length).toBe(
    //     2
    //   );
    // });
    // it('should be able to switch to login form from register', async function() {
    //   renderLogin();
    //
    //   // Choose register form
    //   await fireEvent.click(screen.getByText(/new user/i));
    //
    //   await fireEvent.click(screen.getByText(/login instead/i));
    //
    //   expect(screen.getByText(/log in to cofind/i)).toBeInTheDocument();
    // });
  });
});
