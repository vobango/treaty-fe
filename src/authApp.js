import React from 'react';
import {withAuthorization} from './components/Session';
import {withFirebase} from './components/Firebase';


// this is a mock page to show case protected routes, where app should be
const AppAuth = ({firebase}) => {
  return (
    <div>
      <h1>auth</h1>
      <button type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(AppAuth));
