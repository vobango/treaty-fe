import React, {SyntheticEvent} from 'react';
import {useLocale} from '../context/locale';
import {useQuery} from 'react-query';
import fetch from '../utils/fetch';

const Login: React.FC = () => {
  const {translate} = useLocale();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [formVisible, setFormVisible] = React.useState('');
  const handleQuery = async () => {
    if (!formVisible) return;
    if (formVisible === 'login') {
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password})
      });
    } else {
      await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({username, password, passwordRepeat})
      });
    }
  };
  const {error, isFetching, refetch} = useQuery('login', handleQuery, {
    retry: false,
    manual: true
  });

  return (
    <form
      className="flex flex-col flex-grow items-stretch justify-center h-auto px-3"
      onSubmit={async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!formVisible) {
          setFormVisible('');
          return true;
        }
        await refetch();
      }}
    >
      {formVisible && (
        <>
          <h1 className="text-2xl text-center mb-3">
            {formVisible === 'login'
              ? `${translate('loginTo')} CoFind`
              : 'Create new user'}
          </h1>
          {!!error && (
            <div className="text-red-600 text-center">{`${translate(
              'error'
            )}: ${error.message}`}</div>
          )}
          <div>
            <label className="block" htmlFor="username">
              {translate('username')}
            </label>
            <input
              id="username"
              className="border border-gray-700 rounded-sm px-1 w-full"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label className="block" htmlFor="password">
              {translate('password')}
            </label>
            <input
              id="password"
              className="border border-gray-700 rounded-sm px-1 w-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
          {formVisible === 'register' && (
            <div className="mt-2">
              <label className="block" htmlFor="password-repeat">
                {translate('repeatPassword')}
              </label>
              <input
                id="password-repeat"
                className="border border-gray-700 rounded-sm px-1 w-full"
                value={passwordRepeat}
                onChange={e => setPasswordRepeat(e.target.value)}
                type="password"
              />
            </div>
          )}
        </>
      )}
      <button
        className="bg-green-500 mt-3 p-3 text-xl text-white rounded"
        onClick={e => {
          if (!formVisible) {
            e.preventDefault();
            setFormVisible('login');
          }
        }}
      >
        {isFetching
          ? translate('loading')
          : formVisible === 'register'
          ? translate('register')
          : translate('login')}
      </button>
      {!formVisible && (
        <button
          className="bg-green-500 mt-3 p-3 text-xl text-white rounded"
          onClick={e => {
            if (!formVisible) {
              e.preventDefault();
              setFormVisible('register');
            }
          }}
        >
          New user
        </button>
      )}
      {formVisible && (
        <button
          className="mt-3"
          onClick={e => {
            e.preventDefault();
            setFormVisible(formVisible === 'login' ? 'register' : 'login');
          }}
        >
          {formVisible === 'login' ? 'Sign up' : 'Login'} instead
        </button>
      )}
    </form>
  );
};

export default Login;
