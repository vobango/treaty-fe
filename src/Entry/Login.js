import React, {useState} from 'react';
import {auth} from '../firebase';
import logo from '../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../context/locale';
import entryStyles from './entryStyles';

const Login = ({changePage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {translate} = useLocale();

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError('Error signing in with password and email!');
      console.error('Error signing in with password and email', error);
    });
  };

  const onChangeHandler = event => {
    const {name, value} = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
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
      <h1 className={entryStyles.headerText}>{translate('loginText')}</h1>
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
          {error ? <h1 className="text-red-600">{error}</h1> : null}
        </form>
        <button
          className={entryStyles.entryButton}
          onClick={event =>
            signInWithEmailAndPasswordHandler(event, email, password)
          }
        >
          {translate('login')}
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

export default Login;
