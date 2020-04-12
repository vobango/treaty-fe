import React, {useState} from 'react';
import {auth} from '../firebase';
import logo from '../assets/images/logo.png';
import {useLocale} from '../context/locale';

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
      <h1 className="text-lg text-gray-600 font-bold text-center px-8 mb-8">
        {translate('loginText')}
      </h1>
      <form>
        <input
          type="email"
          className="my-1 p-1 w-full border-b-2"
          name="userEmail"
          value={email}
          placeholder={translate('email')}
          id="userEmail"
          onChange={event => onChangeHandler(event)}
        />
        <input
          type="password"
          className="my-1 p-1 w-full border-b-2"
          name="userPassword"
          value={password}
          placeholder={translate('password')}
          id="userPassword"
          onChange={event => onChangeHandler(event)}
        />
        {error ? <h1 className="text-red-600">{error}</h1> : null}
      </form>
      <button
        className="bg-green-500 mt-4 p-4 text-3xl text-white rounded-lg md:w-full md:max-w-4xl"
        onClick={event =>
          signInWithEmailAndPasswordHandler(event, email, password)
        }
      >
        {translate('login')}
      </button>
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
