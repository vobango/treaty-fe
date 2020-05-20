import React from 'react';
import {useFirebase, withFirebase} from './firebase';

const AuthUserContext = React.createContext(undefined);

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser =>
        this.setState({authUser: authUser || null})
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

function AuthProvider({children}) {
  const fireBase = useFirebase();
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    const listener = fireBase.auth.onAuthStateChanged(user =>
      setAuthUser(user || null)
    );

    return () => {
      listener();
    };
  }, [setAuthUser, fireBase]);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}

function useAuth() {
  const authUser = React.useContext(AuthUserContext);

  if (authUser === undefined) {
    throw new Error(
      'Authenticated user state must be used within AuthProvider component!'
    );
  }

  return {user: authUser, ...authUser};
}

export default withAuthentication;
export {AuthUserContext, AuthProvider, useAuth};
