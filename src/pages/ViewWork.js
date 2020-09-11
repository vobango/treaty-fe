import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import Listing from '../components/listing';
import {Icon} from '../components/icons';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import en from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('en', en);
setDefaultLocale('en');

const ViewWork = () => {
  const {translate} = useLocale();
  const firebase = useFirebase();
  const {state} = useListingForm();
  const {search, listingId} = useLocation();
  const listingType = new URLSearchParams(search).get('type') || 'job';
  const QUERY_LIMIT = 10;
  const [selectedAreas, setAreas] = React.useState([]);
  const handleAreaSelect = area => {
    setAreas(prevState => {
      if (prevState.includes(area)) {
        return prevState.filter(selectedArea => area !== selectedArea);
      } else if (prevState.length === 10) {
        return prevState;
      } else {
        return [...prevState, area];
      }
    });
  };
  const [selectedJob, setJob] = React.useState('');
  const handleJobSelect = event => {
    setJob(event.target.value);
  };
  const [selectedDate, setDate] = React.useState(null);
  const handleDateSelect = date => {
    setDate(date.getTime());
  };

  React.useEffect(() => {
    if (listingId) {
      setTimeout(() => {
        const post = document.getElementById(listingId);
        if (post) {
          post.scrollIntoView({behavior: 'smooth'});
        }
      }, 300);
    }
  }, [listingId]);

  const [paidPosts, setPaidPosts] = useState([]);
  React.useEffect(() => {
    firebase.doGetPaidPosts().then(posts => {
      setPaidPosts(posts);
    });
  }, [firebase, setPaidPosts]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Live updates
    const collection = firebase.db.collection('posts');
    let query = collection.where('type', '==', listingType);
    if (selectedAreas.length > 0) {
      query = query.where('workArea', 'in', selectedAreas);
    }
    if (selectedJob) {
      query = query.where('workFields', 'array-contains', selectedJob);
    }
    if (selectedDate) {
      query = query.where('startDate', '>=', selectedDate);
    }
    const unsubscribe = query.onSnapshot(snapshot => {
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
  }, [firebase, listingType, selectedAreas, selectedJob, selectedDate]);

  return (
    <Layout>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl text-center mb-8">
          {translate(`listings.${listingType}`)}
        </h1>
        <div className="flex justify-center">
          <div className="mr-8 ">
            <div className="flex justify-between mb-2 items-center">
              <h3 className="font-bold">Piirkond</h3>
              <div
                className={` ${
                  selectedAreas.length === QUERY_LIMIT
                    ? 'text-red-500'
                    : 'text-gray-600'
                } text-sm text-right`}
              >
                {selectedAreas.length}/{QUERY_LIMIT}
              </div>
            </div>
            <div className="h-40 overflow-auto mb-3">
              {state.areas.slice(1).map(area => {
                return (
                  <div key={area} className="grid grid-cols-8">
                    <input
                      type="checkbox"
                      id={area}
                      className="mb-1 self-center"
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaSelect(area)}
                    />
                    <label htmlFor={area} className="col-span-7">
                      {area}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Valdkond</h3>
            <select onChange={handleJobSelect} className="input">
              {state.jobs.map((job, i) => {
                return (
                  <option key={job} value={i === 0 ? '' : job}>
                    {job}
                  </option>
                );
              })}
            </select>
            <div className="mt-8">
              <h3 className="font-bold mb-2">Algusaeg</h3>
              <div className="flex items-center">
                <DatePicker
                  dateFormat="dd.MM.yy"
                  id="start-date"
                  placeholderText="pp.kk.aa"
                  className="input w-full mr-1"
                  minDate={new Date()}
                  onChange={handleDateSelect}
                  selected={selectedDate}
                />
                {selectedDate && (
                  <button onClick={() => setDate(null)}>
                    <Icon.Close className="h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} id={post.postId}>
              <Listing
                status={
                  listingId === post.postId || paidPosts.includes(post.postId)
                    ? 'paid'
                    : 'unpaid'
                }
                open={listingId === post.postId}
                {...post}
              />
            </div>
          ))
        ) : (
          <h2>Ühtegi postitust ei leitud</h2>
        )}
      </div>
    </Layout>
  );
};

export default withAuthorization()(ViewWork);
