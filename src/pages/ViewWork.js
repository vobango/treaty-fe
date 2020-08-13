import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import Listing from '../components/listing';

const ViewWork = () => {
  const {translate} = useLocale();
  const [posts, setPosts] = useState([]);
  const [refs, setRefs] = useState({});
  const firebase = useFirebase();
  const {search, listingId} = useLocation();
  const listingType = new URLSearchParams(search).get('type') || 'job';

  useEffect(() => {
    // Live updates
    const collection = firebase.db.collection('posts');
    const unsubscribe = collection
      .where('type', '==', listingType)
      .onSnapshot(snapshot => {
        let readData = [];

        if (snapshot.size) {
          snapshot.forEach(doc => {
            readData.push({id: doc.ref.id, ...doc.data()});
          });
        }

        readData.sort((a, b) => {
          return b.created - a.created;
        });
        setPosts(readData);
      });
    return () => {
      unsubscribe();
    };
  }, [firebase, listingType]);

  React.useEffect(() => {
    if (listingId) {
      setTimeout(() => {
        document.getElementById(listingId).scrollIntoView({behavior: 'smooth'});
      }, 300);
    }
  }, [listingId]);

  return (
    <Layout>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl text-center">
          {translate(`listings.${listingType}`)}
        </h1>
        {posts.map(post => (
          <div key={post.id} id={post.postId}>
            <Listing
              status={listingId === post.postId ? 'paid' : 'unpaid'}
              {...post}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default withAuthorization()(ViewWork);
