import React from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <form className="flex flex-col flex-grow items-stretch justify-center h-auto px-3">
      <h1 className="text-2xl text-center mb-3">Log in to CoFind</h1>
      <div>
        <label className="block" htmlFor="username">
          Username
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
          Password
        </label>
        <input
          id="password"
          className="border border-gray-700 rounded-sm px-1 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <button className="bg-gray-300 mt-3 p-3 text-xl rounded-sm">Login</button>
    </form>
  );
};

export default Login;
