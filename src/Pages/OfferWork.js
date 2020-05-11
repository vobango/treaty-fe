import React, {useState} from 'react';
import Layout from '../components/layout';
import {withFirebase} from '../components/Firebase';
import {withAuthorization} from '../components/Session';

const OfferWork = ({firebase}) => {
  const [addPost, setAddPost] = useState('');

  const sendPost = () => {
    if (addPost.length > 0) {
      firebase.doAddPost(addPost);
    }
  };
  return (
    <Layout>
      <div>
        <h1>Add post:</h1>
        <input
          className="input-box"
          value={addPost}
          onChange={e => setAddPost(e.target.value)}
        />
        <button className="entry-button" onClick={() => sendPost()}>
          Send post
        </button>
      </div>
    </Layout>
  );
};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(OfferWork));
