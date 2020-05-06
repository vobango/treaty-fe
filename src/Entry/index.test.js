import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {renderWithLocale, translate} from '../testUtils';
import Entry from './index';
import {BrowserRouter} from 'react-router-dom';

// // TODO: Uncomment tests, reimplement with new components
// // TODO: Localization tests. https://testing-library.com/docs/example-react-intl
describe('Entry component', function() {
  const renderLogin = () => {
    renderWithLocale(
      <BrowserRouter>
        <Entry />
      </BrowserRouter>
    );
  };

  it('should render without crashing', function() {
    renderLogin();
  });

  it('should render necessary components', function() {
    renderLogin();
    expect(screen.getByText(translate('login')));
    expect(screen.getByText(translate('register')));
    expect(screen.getByText('EST'));
  });

  describe('Login flow', function() {
    it('should display loginScreen', async function() {
      renderLogin();

      // Choose login form
      await fireEvent.click(screen.getByText(translate('login')));

      expect(screen.getByText(translate('loginText'))).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(translate('email'))
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(translate('password'))
      ).toBeInTheDocument();
      expect(screen.getByText(translate('login'))).toBeInTheDocument();
      expect(screen.getByText(translate('cancelRegister'))).toBeInTheDocument();
    });
  });

  /* describe('Register flow', function() {
    it('should display inputs for username, password and password repeat', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(translate('register')));

      expect(screen.getByText('Register a new account')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Repeat password')
      ).toBeInTheDocument();
      expect(screen.getByText('Sign up')).toBeInTheDocument();
      expect(screen.getByText('cancel')).toBeInTheDocument();
    });

    it('should be able to switch to entry form from register', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText('Sign up'));

      await fireEvent.click(screen.getByText('cancel'));

      expect(screen.getByText('To start, make a choice'));
    });
    
   */

  // it('should attempt to register account registration', async function() {
  //   const renderLogin = () => {
  //     return render(
  //       withFirebase(
  //         <BrowserRouter>
  //           <Entry />
  //         </BrowserRouter>
  //       )
  //     );
  //   };
  //
  //   renderLogin();
  //   await fireEvent.click(screen.getByText('Sign up'));
  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const passwordRepeatInput = screen.getByPlaceholderText(
  //     'Repeat password'
  //   );
  //
  //   const password = faker.internet.password();
  //
  //   fireEvent.change(emailInput, {target: {value: 'Test@gmail.com'}});
  //   fireEvent.change(passwordInput, {target: {value: password}});
  //   fireEvent.change(passwordRepeatInput, {target: {value: password}});
  //
  //   await wait(() => fireEvent.click(screen.getByText('Sign up')));
  //
  //   await wait(() => {
  //     expect(screen.getByText('Passwords do not match!'));
  //   });
  // });
  // });
});
