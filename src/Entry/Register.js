import React, {useState} from 'react';
import logo from '../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../context/locale';
import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../utils/routes';
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
    if (password !== passwordRepeat) {
      setError(translate('passwordMatchError'));
      return;
    }
    if (!eula) {
      setError(translate('eulaError'));
      return;
    }
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push(ROUTES.APP);
      })
      .catch(error => {
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
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
        <img className="h-16 md:h-24 mt-8" src={logo} alt={translate('logo')} />
      </a>
      <h1 className="header-text">{translate('newAccount')}</h1>
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
          <input
            type="password"
            className="input-box"
            name="userRepeatPassword"
            value={passwordRepeat}
            placeholder={translate('repeatPassword')}
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <lable>
            <input
              type="checkbox"
              className="mr-4"
              onChange={() => handleEulaToggle()}
            />
            {eulaText.substring(0, eulaText.lastIndexOf(' ')) + ' '}
            <Link to="/eula" className="underline text-blue-600">
              {eulaText.split(' ').splice(-1)[0]}
            </Link>
          </lable>

          {error ? <h1 className="text-red-600">{error}</h1> : null}
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
