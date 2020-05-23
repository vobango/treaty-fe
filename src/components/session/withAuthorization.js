import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../../providers/firebase';
import * as ROUTES from '../../utils/routes';
import {AuthUserContext} from '../../providers/authentication';

export const condition = authUser => !!authUser;

const withAuthorization = (condition = user => !!user) => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.LANDING);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? (
              <Component {...this.props} user={authUser} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};
export default withAuthorization;
