import React, {useState} from 'react';
import {withAuthorization} from './components/Session';
import {withFirebase} from './components/Firebase';

// this is a mock page to show case protected routes, where app should be
const AppAuth = ({firebase}) => {
  const [addPost, setAddPost] = useState('');

  const sendPost = () => {
    console.log(addPost);
    if (addPost.length > 0) {
      console.log('here');
      firebase.doCreatePost(addPost);
    }
  };
  return (
    <div>
      <h1>Auth protected page</h1>
      <button type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
      <div>
        <h1>Add post</h1>
        <input value={addPost} onChange={e => setAddPost(e.target.value)} />
        <button onClick={() => sendPost()}>Send post</button>
      </div>
      <div>
        <h1>See all other user posts</h1>
        <p>Note you can only delete posts created by you</p>
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(AppAuth));
