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
    // adds post details to details collection
    this.db
      .collection('details')
      .add({
        email: this.auth.currentUser.email,
        contactEmail: post.contactEmail,
        contactName: post.contactName,
        contactPhone: post.contactPhone,
        companyName: post.companyName,
        details: post.post
      })
      .then(
        function(detailsRef) {
          // adds post to post collection for previews. Also stores refrence to each posts details
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
              type: post.type,
              postId: detailsRef.id,
              created: new Date()
            })
            .then(
              function(postRef) {
                // adds the posts reference to the current users posts
                const userRef = this.db
                  .collection('users')
                  .doc(this.auth.currentUser.email);
                userRef.get().then(docSnapshot => {
                  if (docSnapshot.exists) {
                    userRef.update({
                      posts: app.firestore.FieldValue.arrayUnion(postRef.id)
                    });
                  } else {
                    // only creates user object, if the user actually creates a post/makes a purchase
                    this.db
                      .collection('users')
                      .doc(this.auth.currentUser.email)
                      .set({
                        posts: [postRef.id],
                        created: new Date().getTime()
                      });
                  }
                });
              }.bind(this)
            );
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

  doGetDetails = async postId => {
    if (!postId) return;
    return this.db
      .collection('details')
      .doc(postId)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return docSnapshot.data();
        }
      });
  };

  doCheckUserPremium = async () => {
    const userRef = this.db
      .collection('users')
      .doc(this.auth.currentUser.email);

    return userRef.get().then(function(doc) {
      if (doc.exists) {
        return !!doc.data().premium;
      } else {
        return false;
      }
    });
  };
}
export default Firebase;
