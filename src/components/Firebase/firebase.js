import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6fQSbiesH2wVYNUWs0ul3oeDr0LpwJ0g',
  authDomain: 'cofind-2f876.firebaseapp.com',
  databaseURL: 'https://cofind-2f876.firebaseio.com',
  projectId: 'cofind-2f876',
  storageBucket: 'cofind-2f876.appspot.com',
  messagingSenderId: '550090633897',
  appId: '1:550090633897:web:1708be98301a83aa012fb8'
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
}
export default Firebase;