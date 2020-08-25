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
  doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      this.doCreateUserObject(email);
    } catch (e) {
      console.error(e);
    }
  };
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  getUserRef = () => {
    return this.db.collection('users').doc(this.auth.currentUser.email);
  };

  doCreateUserObject = email => {
    this.db
      .collection('users')
      .doc(email)
      .set({
        posts: [],
        paidPosts: [],
        notifications: true
      });
  };

  // *** Post API ***
  doAddPost = async post => {
    // adds post details to details collection
    const detailsRef = await this.db.collection('details').add({
      email: this.auth.currentUser.email,
      contactEmail: post.contactEmail,
      contactName: post.contactName,
      contactPhone: post.contactPhone,
      companyName: post.companyName,
      details: post.post
    });

    // adds post to post collection for previews. Also stores refrence to each posts details
    await this.db.collection('posts').add({
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
    });

    // adds the posts reference to the current users posts
    const userRef = await this.db
      .collection('users')
      .doc(this.auth.currentUser.email);
    const docSnapshot = await userRef.get();

    if (docSnapshot.exists) {
      userRef.update({
        posts: app.firestore.FieldValue.arrayUnion(detailsRef.id)
      });
    }

    return detailsRef.id;
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

  doAddPaidListing = async listingId => {
    const doc = await this.getUserRef().get();

    if (!doc.exists) {
      return;
    }
    this.getUserRef().update({
      paidPosts: app.firestore.FieldValue.arrayUnion(listingId)
    });
  };

  doGetPaidPosts = async () => {
    const doc = await this.getUserRef().get();
    if (!doc.exists) {
      return [];
    }

    const ownPosts = doc.data().posts || [];
    const paidPosts = doc.data().paidPosts || [];

    return [...ownPosts, ...paidPosts];
  };
}
export default Firebase;
