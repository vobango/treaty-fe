import {AnimatePresence, motion} from 'framer-motion';
import {formatDate, formatRelative} from '../utils/helpers';
import {Icon} from './icons';
import React, {useState} from 'react';
import {useLocale} from '../providers/locale';
import {useFirebase} from '../providers/firebase';

//TODO: should probably be extracted as a dummy component

const Listing = ({post}) => {
  const format = date => formatDate(date);
  const {translate, locale} = useLocale();
  const {created, workArea, workField1, workerCount, dateRange = []} = post;
  const [from, to] = dateRange;
  const itemClasses = 'flex items-center mr-3';
  const iconClasses = 'h-6 w-6 text-gray-600';
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState();
  const [showModal, setShowModal] = useState(false);

  const firebase = useFirebase();

  const fetchDetails = async () => {
    setDetails(await firebase.doGetDetails(post.postId));
  };

  const handleShowMoreClick = async overwrite => {
    let userHasRights = (await firebase.doCheckUserPremium()) || overwrite;
    if (userHasRights) {
      setShowDetails(!showDetails);
      fetchDetails();
    } else {
      setShowModal(true);
    }
  };

  const handlePayment = () => {
    const success = true;
    if (success) {
      fetchDetails();
      setShowDetails(true);
      setShowModal(false);
    } else {
      setShowDetails(false);
      setShowModal(false);
    }
  };

  return (
    <motion.div
      key={created}
      className="shadow-lg rounded-lg bg-green-100 p-6 my-8"
    >
      <h2 className="text-xl">{workField1}</h2>
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
      <button
        onClick={() => handleShowMoreClick()}
        className="flex justify-center items-center py-1 px-3 mt-6 rounded-full border-2 border-green-500 text-gray-800 text-sm w-1/2"
      >
        Vaata lähemalt{' '}
        <Icon.Arrow direction="right" className="w-5 h-5 ml-2 text-gray-600" />
      </button>
      <AnimatePresence>
        {showDetails && details && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: 'auto'},
              collapsed: {opacity: 0, height: 0}
            }}
            transition={{duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98]}}
          >
            <div>
              <p>
                Company name: <span>{details.companyName}</span>
              </p>
              <p>
                Email: <span>{details.contactEmail}</span>
              </p>
              <p>
                Phone number: <span>{details.contactPhone}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showModal && (
        <div
          className="fixed center w-1/2 bg-green-300 text-center h-64 flex justify-around items-center rounded"
          style={{top: '50%'}}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-0 right-0 mr-1 mt-1"
          >
            X
          </button>
          <button
            onClick={() => handlePayment(true)}
            className="border-2 p-4 rounded w-1/3"
          >
            Buy Article
          </button>
          <button
            onClick={() => handlePayment()}
            className="border-2 p-4 rounded w-1/3"
          >
            Buy Premium
          </button>
        </div>
      )}
    </motion.div>
  );
};
export default Listing;
