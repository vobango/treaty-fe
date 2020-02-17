import React from 'react';
import {useLocale} from '../context/locale';

const Login: React.FC = () => {
  const {translate} = useLocale();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <form className="flex flex-col flex-grow items-stretch justify-center h-auto px-3">
      <h1 className="text-2xl text-center mb-3">
        {translate('loginTo')} CoFind
      </h1>
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
      <button className="bg-gray-300 mt-3 p-3 text-xl rounded-sm">
        {translate('login')}
      </button>
    </form>
  );
};

export default Login;
