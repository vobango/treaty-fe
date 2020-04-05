import React, {useState} from 'react';

import EntryPage from './EntryPage';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';

const Entry = () => {
  const [currentPage, setCurrentPage] = useState('entry');

  const changePage = page => {
    setCurrentPage(page);
  };

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
