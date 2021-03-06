import React, {useState} from 'react';
import * as ROUTES from '../../utils/routes';
import logo from '../../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../../providers/locale';
import {withFirebase} from '../../providers/firebase';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

const LoginBase = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {translate} = useLocale();

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setEmail('');
        setPassword('');
        setError(error.message);
      });

    event.preventDefault();
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
    <div className="flex flex-col flex-grow justify-between h-screen px-8">
      <a href="/" className="flex justify-center">
        <img className="h-24 mt-8" src={logo} alt={translate('logo')} />
      </a>
      <h1 className="header-text">{translate('loginText')}</h1>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <form className="md:w-1/3">
          <input
            type="email"
            className="input-box"
            name="userEmail"
            value={email}
            placeholder={translate('email')}
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className="input-box"
            name="userPassword"
            value={password}
            placeholder={translate('password')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          {error ? <h1 className="text-red-600">{error}</h1> : null}
        </form>
        <button
          className="entry-button"
          onClick={event =>
            signInWithEmailAndPasswordHandler(event, email, password)
          }
        >
          {translate('login')}
        </button>
      </div>
      <button
        className="text-xl text-gray-600 font-bold my-8"
        onClick={() => props.changePage('entry')}
      >
        {translate('cancelRegister')}
      </button>
    </div>
  );
};

const Login = compose(withRouter, withFirebase)(LoginBase);

export default Login;
