import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {withFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {condition} from '../components/session/withAuthorization';

const ViewWork = ({firebase}) => {
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

  return (
    <Layout>
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
              className="entry-button"
              onClick={() =>
                firebase.doDeletePost(
                  el.created,
                  firebase.auth.currentUser.email
                )
              }
            >
              DELETE POST
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default withFirebase(withAuthorization(condition)(ViewWork));
