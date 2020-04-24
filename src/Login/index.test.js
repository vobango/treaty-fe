import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import faker from 'faker';
import fetch from 'jest-fetch-mock';
import {renderWithLocale} from '../testUtils';
import Login from './index';

describe.skip('Login component', function() {
  const renderLogin = () => {
    renderWithLocale(<Login />);
  };

  it('should render without crashing', function() {
    renderLogin();
  });

  describe('Login flow', function() {
    it('should display an input for username', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(/login/i));

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    });

    it('should display an input for password', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(/login/i));

      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should display an error message when login fails', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(/login/i));

      const errorMessage = faker.random.word();
      fetch.mockRejectOnce(() => Promise.reject({message: errorMessage}));

      // Submit login form
      await fireEvent.click(screen.getByText(/login/i));

      // Wait until HTTP call resolves
      const error = await screen.findByText(errorMessage, {exact: false});

      expect(error).toBeInTheDocument();
    });

    it('should be able to switch to register form from login', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(/login/i));

      // Switch to register form
      await fireEvent.click(screen.getByText(/sign up instead/i));

      // Search for text only visible in the register form
      expect(screen.getByText(/create new user/i)).toBeInTheDocument();
    });
  });

  describe('Register flow', function() {
    it('should display inputs for username, password and password repeat', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(/new user/i));

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getAllByLabelText(/password/i, {exact: false}).length).toBe(
        2
      );
    });

    it('should be able to switch to login form from register', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(/new user/i));

      await fireEvent.click(screen.getByText(/login instead/i));

      expect(screen.getByText(/log in to cofind/i)).toBeInTheDocument();
    });

    it('should handle data input', async function() {
      renderLogin();

      await fireEvent.click(screen.getByText(/new user/i));

      await fireEvent.change(screen.getByLabelText(/username/i), {
        target: {value: faker.internet.email()}
      });
      const password = faker.random.uuid();
      await fireEvent.change(screen.getByLabelText('Password'), {
        target: {value: password}
      });
      await fireEvent.change(screen.getByLabelText(/repeat password/i), {
        target: {value: password}
      });

      fetch.mockResponse(() => {});
      await fireEvent.click(screen.getByRole('button', {name: /sign up/i}));
    });
  });
});
