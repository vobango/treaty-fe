import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {renderWithLocale} from '../../utils/forTests';
import Entry from '../Entry';
import {BrowserRouter} from 'react-router-dom';
import {translator} from '../../utils/i18n';

// // TODO: Uncomment tests, reimplement with new components
// // TODO: Localization tests. https://testing-library.com/docs/example-react-intl
describe('Entry component', function() {
  const translate = translator('et');
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

  it('should render neccesary components', function() {
    renderLogin();
    expect(screen.getByText(translate('login')));
    expect(screen.getByText(translate('register')));
    expect(screen.getByText(translate('entryText')));
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
    // it('should display an error message when login fails', async function() {

    it('should be able to switch to entry form login', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(translate('login')));

      await fireEvent.click(screen.getByText(translate('cancelRegister')));

      expect(screen.getByText(translate('entryText')));
    });
  });

  describe('Register flow', function() {
    it('should display inputs for username, password and password repeat', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(translate('register')));

      expect(screen.getByText(translate('newAccount'))).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(translate('email'))
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(translate('password'))
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(translate('repeatPassword'))
      ).toBeInTheDocument();
      expect(screen.getByText(translate('register'))).toBeInTheDocument();
      expect(screen.getByText(translate('cancelRegister'))).toBeInTheDocument();
    });

    it('should be able to switch to entry form from register', async function() {
      renderLogin();

      // Choose register form
      await fireEvent.click(screen.getByText(translate('register')));

      await fireEvent.click(screen.getByText(translate('cancelRegister')));

      expect(screen.getByText(translate('entryText')));
    });

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
  });
});
