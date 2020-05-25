import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {withFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {Icon} from '../components/icons';
import {Link} from 'react-router-dom';
import {useLocale} from '../providers/locale';
import {formatDate, formatRelative} from '../utils/helpers';

const ViewWork = ({firebase}) => {
  const {translate, locale} = useLocale();
  const [posts, setPosts] = useState([]);
  const format = date => formatDate(date);

  useEffect(() => {
    // Live updates
    const unsubscribe = firebase.db.collection('posts').onSnapshot(snapshot => {
      let readData = [];

      if (snapshot.size) {
        snapshot.forEach(doc => readData.push({...doc.data()}));
      }

      readData.sort((a, b) => {
        return b.created - a.created;
      });
      setPosts(readData);
    });
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl">{translate('listings')}</h1>
        {posts.map((post, i) => {
          const {
            created,
            workArea,
            workField,
            workerCount,
            dateRange = []
          } = post;
          const [from, to] = dateRange;
          const itemClasses = 'flex items-center mr-3';
          const iconClasses = 'h-6 w-6 text-gray-600';

          return (
            <div
              key={created}
              className="shadow-lg rounded-lg bg-green-100 p-6 my-8"
            >
              <h2 className="text-xl">{workField}</h2>
              <div className="text-gray-600 text-sm mb-6">
                {translate('workStartsIn')} {formatRelative(locale)(from)}
              </div>
              <div className="flex">
                {!!workArea && (
                  <div className={itemClasses}>
                    <Icon.Marker className={iconClasses} />
                    {workArea}
                  </div>
                )}
                {!!workerCount && (
                  <div className={itemClasses}>
                    <Icon.Worker className={iconClasses} />
                    {workerCount}
                  </div>
                )}
                {!!from && !!to && (
                  <div className={itemClasses}>
                    <Icon.Calendar className={iconClasses} />
                    {format(from)} - {format(to)}
                  </div>
                )}
              </div>
              <Link
                to={`posts/${123}`}
                className="flex justify-center items-center py-1 px-3 mt-6 rounded-full border-2 border-green-500 text-gray-800 text-sm w-1/2"
              >
                Vaata lähemalt{' '}
                <Icon.Arrow
                  direction="right"
                  className="w-5 h-5 ml-2 text-gray-600"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default withFirebase(withAuthorization()(ViewWork));
