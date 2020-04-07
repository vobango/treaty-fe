import React, {useState} from 'react';
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'userEmail') {
      setEmail(value);
    }
    else if(name === 'userPassword'){
      setPassword(value);
    }
  };

  return <div>
    <form>
      <label htmlFor="userEmail">
        Email:
      </label>
      <input
          type="email"
          className=""
          name="userEmail"
          value = {email}
          placeholder="E.g: faruq123@gmail.com"
          id="userEmail"
          onChange = {(event) => onChangeHandler(event)}
      />
    </form>
    <label htmlFor="userPassword" className="block">
      Password:
    </label>
    <input
        type="password"
        className="mt-1 mb-3 p-1 w-full"
        name="userPassword"
        value = {password}
        placeholder="Your Password"
        id="userPassword"
        onChange = {(event) => onChangeHandler(event)}
    />
    <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
      Sign in
    </button>
  </div>;
};

export default Login;
