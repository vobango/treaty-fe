import React, {useState} from 'react';
import { auth } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [copmany, setCompany] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();

      try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
      }
      catch(error){
          setError('Error Signing up with email and password');
      }

      setEmail("");
      setPassword("");
  };
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
        setPassword(value);
    }
  };

  return(
      <form className="">
        <label htmlFor="userEmail" className="block">
          Email:
        </label>
        <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
        />
        <label htmlFor="userPassword" className="block">
          Password:
        </label>
        <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
        />
        <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
        >
          Sign up
        </button>
      </form>
  )
};

export default Register;
