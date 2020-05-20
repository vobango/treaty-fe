import React, {useEffect, useState} from 'react';
import EntryPage from './EntryPage';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';

// TODO: Type validation in useEffect
const Entry = props => {
  const [currentPage, setCurrentPage] = useState('entry');

  const changePage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const subPath = props.location && props.location.state.subPath;
    setCurrentPage(subPath ? subPath : 'entry');
  }, []);

  switch (currentPage) {
    case 'login':
      return <Login changePage={changePage} />;
    case 'register':
      return <Register changePage={changePage} />;
    case 'resetPassword':
      return <PasswordReset changePage={changePage} />;
    default:
      return <EntryPage changePage={changePage} />;
  }
};

export default Entry;
