import React, {useState} from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [copmany, setCompany] = useState('');
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(null);
};

export default Register;
