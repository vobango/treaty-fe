import React, {useState} from 'react';
import {auth} from '../firebase';
import logo from '../assets/images/logo.png';
import {useLocale} from '../context/locale';
import entryStyles from './entryStyles';

const Register = ({changePage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState(null);
  const [inputTypePassword, setInputTypePassword] = useState('input');

  const {translate} = useLocale();
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password,
    passwordRepeat
  ) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setError(translate('passwordMatchError'));
      return;
    }
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(translate('generalRegisterError'));
    }

    setEmail('');
    setPassword('');
    setPasswordRepeat('');
  };
  const onChangeHandler = event => {
    const {name, value} = event.currentTarget;
    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    } else if (name === 'userRepeatPassword') {
      setPasswordRepeat(value);
    }
  };

  return (
    <div className="flex flex-col flex-grow justify-between h-auto px-8">
      <a href="/" className="flex justify-center">
        <img
          className="w-auto sm:h-24 mt-8"
          src={logo}
          alt={translate('logo')}
        />
      </a>
      <h1 className={entryStyles.headerText}>{translate('newAccount')}</h1>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <form className="md:w-1/3">
          <input
            type="email"
            className={entryStyles.inputBox}
            name="userEmail"
            value={email}
            placeholder={translate('email')}
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className={entryStyles.inputBox}
            name="userPassword"
            value={password}
            placeholder={translate('password')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className={entryStyles.inputBox}
            name="userRepeatPassword"
            value={passwordRepeat}
            placeholder={translate('repeatPassword')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          {error ? <h1 className="text-red-600">{error}</h1> : null}
        </form>
        <button
          className={entryStyles.entryButton}
          onClick={event => {
            createUserWithEmailAndPasswordHandler(
              event,
              email,
              password,
              passwordRepeat
            );
          }}
        >
          {translate('register')}
        </button>
      </div>
      <button
        className="text-xl text-gray-600 font-bold my-8"
        onClick={() => changePage('entry')}
      >
        {translate('cancelRegister')}
      </button>
    </div>
  );
};

export default Register;
