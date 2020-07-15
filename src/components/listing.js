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
  const itemClasses = 'flex items-center text-sm font-light text-gray-700';
  const detailsButton =
    'text-sm uppercase rounded-lg py-3 px-6 tracking-wide xl:text-lg';
  const iconClasses = 'h-6 w-6 text-gray-600';
  const [details, setDetails] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);

  const firebase = useFirebase();

  const fetchDetails = async () => {
    setDetails(await firebase.doGetDetails(post.postId));
  };

  const handlePayment = () => {
    const success = true;
    if (success) {
      fetchDetails();
    }
  };

  const renderDetails = () => {
    return (
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
        {!!details.details && (
          <p>
            Detailid: <span>{details.details}</span>
          </p>
        )}
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{workField1}</h2>
          {!!workArea && (
            <div className={'font-bold text-md text-black'}>{workArea}</div>
          )}
        </div>
        <div className="flex justify-between">
          {!!from && !!to && (
            <div className={itemClasses}>
              {format(from)} - {format(to)}
            </div>
          )}
          {!!created && (
            <div className={itemClasses}>Lisatud {format(created)}</div>
          )}
        </div>
      </div>
    );
  };

  const renderPurchaseButtons = () => {
    if (!!details) return null;
    return (
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePayment()}
          className={detailsButton + ' text-gray-700 bg-gray-200'}
        >
          Registeeru
        </button>
        <button
          onClick={() => handlePayment()}
          className={detailsButton + ' text-white bg-green-500'}
        >
          Maksa (1€)
        </button>
      </div>
    );
  };

  return (
    <motion.div
      key={created}
      className="shadow-lg rounded-lg bg-green-100 p-6 my-8"
    >
      {renderHeader()}

      <div className="flex mt-4 items-center">
        <div className="w-10/12">
          {!details ? (
            <p
              className="select-none text-transparent"
              style={{textShadow: '0 0 5px rgba(0,0,0,0.5)'}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, ed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          ) : (
            renderDetails()
          )}
        </div>
        {!details && (
          <button onClick={() => setOpenDropdown(!openDropdown)}>
            <Icon.DoubleArrow
              direction="right"
              className="w-16 h-8 ml-2 text-green-600"
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {openDropdown && (
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
            {renderPurchaseButtons()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Listing;
