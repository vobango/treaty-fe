import React, {useState} from 'react';
import logo from '../../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../../providers/locale';
import {withFirebase} from '../../providers/firebase';
import * as ROUTES from '../../utils/routes';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

const RegisterBase = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState(null);
  const [eula, setEula] = useState(false);

  const {translate} = useLocale();
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password,
    passwordRepeat
  ) => {
    event.preventDefault();
    setError(null);
    if (email.length === 0) {
      setError('missingEmail');
      return;
    }
    if (password.length === 0 || passwordRepeat.length === 0) {
      setError('missingPassword');
      return;
    }
    if (password !== passwordRepeat) {
      setError('passwordMatchError');
      return;
    }
    if (!eula) {
      setError('eulaError');
      return;
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setError(translate(error.code));
      });
    event.preventDefault();
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

  const handleEulaToggle = () => {
    setEula(!eula);
  };

  const eulaText = translate('eulaAgreement');

  return (
    <div className="flex flex-col flex-grow justify-between h-screen px-8">
      <a href="/" className="flex justify-center">
        <img className="h-24 mt-8" src={logo} alt={translate('logo')} />
      </a>
      <h1 className="header-text">{translate('newAccount')}</h1>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <form className="md:w-1/3">
          <input
            type="email"
            className={`input-box ${
              error &&
              (email.length === 0 ||
                error === 'auth/invalid-email' ||
                error === 'auth/email-already-in-use')
                ? 'error'
                : ''
            }`}
            name="userEmail"
            value={email}
            placeholder={translate('email')}
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className={`input-box ${
              error &&
              (password.length === 0 ||
                error === 'auth/weak-password' ||
                error === 'passwordMatchError')
                ? 'error'
                : ''
            }`}
            name="userPassword"
            value={password}
            placeholder={translate('password')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className={`input-box ${
              error &&
              (passwordRepeat.length === 0 || error === 'passwordMatchError')
                ? 'error'
                : ''
            }`}
            name="userRepeatPassword"
            value={passwordRepeat}
            placeholder={translate('repeatPassword')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <label>
            <input
              type="checkbox"
              className="mr-4"
              onChange={() => handleEulaToggle()}
            />
            {eulaText.substring(0, eulaText.lastIndexOf(' ')) + ' '}
            <Link to="/eula" className="underline text-blue-600">
              {eulaText.split(' ').splice(-1)[0]}
            </Link>
          </label>

          {error ? <h1 className="text-red-600">{translate(error)}</h1> : null}
        </form>
        <button
          className="entry-button"
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
        onClick={() => props.changePage('entry')}
      >
        {translate('cancelRegister')}
      </button>
    </div>
  );
};

const Register = compose(withRouter, withFirebase)(RegisterBase);

export default Register;
