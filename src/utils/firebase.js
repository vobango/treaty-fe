import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

    this.db = app.firestore();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Post API ***
  doAddPost = post => {
    this.db
      .collection('posts')
      .add({
        post: post.post,
        workerCount: post.workerCount,
        workArea: post.workArea,
        workField1: post.workField1,
        workField2: post.workField2,
        dateRange: [
          new Date(post.startDate).getTime(),
          new Date(post.endDate).getTime()
        ],
        email: this.auth.currentUser.email,
        created: new Date().getTime(),
        contactEmail: post.contactEmail,
        contactName: post.contactName,
        contactPhone: post.contactPhone,
        companyName: post.companyName
      })
      .then(
        function(docRef) {
          // adds the posts reference to the current users posts
          const userRef = this.db
            .collection('users')
            .doc(this.auth.currentUser.email);
          userRef.get().then(docSnapshot => {
            if (docSnapshot.exists) {
              userRef.update({
                posts: app.firestore.FieldValue.arrayUnion(docRef.id)
              });
            } else {
              this.db
                .collection('users')
                .doc(this.auth.currentUser.email)
                .set({
                  posts: [docRef.id],
                  created: new Date().getTime()
                });
            }
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  doGetReference = (created, user, collection) => {
    let query = this.db.collection(collection);
    query = query.where('email', '==', user);
    query = query.where('created', '==', created);
    return query
      .get()
      .then(snapshot => {
        let id = '';
        snapshot.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          id = doc.id;
        });
        return id;
      })
      .catch(err => console.log('error', err));
  };

  doDeletePost = async (created, user) => {
    // check if user contains
    const referenceId = await this.doGetReference(created, user, 'posts');
    if (referenceId) {
      this.db
        .collection('posts')
        .doc(referenceId)
        .delete()
        .then();
    }
  };
}
export default Firebase;
