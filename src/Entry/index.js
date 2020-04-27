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

  return (
    <>
      {currentPage === 'entry' ? <EntryPage changePage={changePage} /> : ''}
      {currentPage === 'login' ? <Login changePage={changePage} /> : ''}
      {currentPage === 'register' ? <Register changePage={changePage} /> : ''}
      {currentPage === 'resetPassword' ? (
        <PasswordReset changePage={changePage} />
      ) : (
        ''
      )}
    </>
  );
};

export default Entry;
