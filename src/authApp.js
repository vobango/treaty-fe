import React, {useState, useEffect} from 'react';
import {withAuthorization} from './components/Session';
import {withFirebase} from './components/Firebase';

// this is a mock page to show case protected routes, where app should be
const AppAuth = ({firebase}) => {
  const [addPost, setAddPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Live updates
    const unsubscribe = firebase.db.collection('posts').onSnapshot(snapshot => {
      if (snapshot.size) {
        let readData = [];
        snapshot.forEach(doc => readData.push({...doc.data()}));
        setPosts(readData);
      } else {
        setPosts([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  const sendPost = () => {
    if (addPost.length > 0) {
      firebase.doAddPost(addPost);
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
        <h1>Currently you can only delete the last one</h1>
        {posts.map(el => (
          <div>
            <p>I am a post created by user: {el.email}</p>
            <p>{el.post}</p>
            {el.created && (
              <p>
                The post was created at: {new Date(el.created).toDateString()}
              </p>
            )}
            <button
              onClick={() =>
                firebase.doDeletePost(
                  el.created,
                  firebase.auth.currentUser.email
                )
              }
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(AppAuth));
