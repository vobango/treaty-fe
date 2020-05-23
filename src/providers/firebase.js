import React from 'react';
import Firebase from '../utils/firebase';

const FirebaseContext = React.createContext(undefined);

function FirebaseProvider({children}) {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
}

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

function useFirebase() {
  const fireBase = React.useContext(FirebaseContext);

  if (fireBase === undefined) {
    throw new Error('Firebase context used outside of provider!');
  }

  return fireBase;
}

export {FirebaseProvider, withFirebase, useFirebase};
