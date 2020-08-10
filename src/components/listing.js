import {AnimatePresence, motion} from 'framer-motion';
import {formatDate, formatRelative} from '../utils/helpers';
import {Icon} from './icons';
import React, {useState} from 'react';
import {useLocale} from '../providers/locale';
import {useFirebase} from '../providers/firebase';

//TODO: should probably be extracted as a dummy component

const Listing = ({
  created,
  workArea,
  workField1,
  workField2,
  workerCount,
  dateRange = [],
  postId
}) => {
  const format = date => formatDate(date);
  const {translate, locale} = useLocale();
  const [from, to] = dateRange;
  const itemClasses = 'flex items-center text-sm font-light text-gray-700';
  const detailsButton =
    'text-sm uppercase rounded-lg py-3 px-3 tracking-wide xl:text-md sm:w-1/3 sm:text-xs';
  const headerText =
    'font-bold text-xs md:text-sm w-3/5 md:w-1/3 flex justify-between items-center';
  const detailText =
    'text-md md:text-lg font-thin w-full md:w-2/3 break-words overflow-auto';
  const groupingClass = 'flex my-1';
  const [details, setDetails] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);

  const firebase = useFirebase();

  const fetchDetails = async () => {
    setDetails(await firebase.doGetDetails(postId));
  };

  const handlePayment = () => {
    const success = true;
    if (success) {
      fetchDetails();
    }
  };

  const renderDetailsHeader = () => {
    return (
      <div className="relative">
        <div>
          {!!workField1 && (
            <div className="flex">
              <p className={headerText}>{translate('workSpecialty1')}</p>
              <p className={detailText}>{workField1}</p>
            </div>
          )}
          {!!workField2 && (
            <div className="flex">
              <p className={headerText}>{translate('workSpecialty2')}</p>
              <p className={detailText}>{workField2}</p>
            </div>
          )}
        </div>
        {!!workerCount && (
          <div className="absolute top-0 right-0 mr-2 flex items-center">
            <Icon.Worker className="h-8 w-8 text-gray-600" />
            {workerCount}
          </div>
        )}
      </div>
    );
  };

  const renderDetailsContent = () => {
    return (
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: 'auto'},
              collapsed: {opacity: 0, height: 0}
            }}
            transition={{duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98]}}
          >
            {!!details.details && (
              <div className="my-4">
                <p className={headerText}>{translate('otherInfo')}</p>
                <p className={detailText}>{details.details}</p>
              </div>
            )}
            <hr className="my-3" />
            <div className="flex flex-col">
              <p
                className={'w-full mb-2 font-bold text-sm flex justify-center'}
              >
                Kontakt
              </p>
              <div className={groupingClass}>
                <p className={headerText}>{translate('contactPersonName')}:</p>
                <p className={detailText}>{details.contactName}</p>
              </div>
              <div className={groupingClass}>
                <p className={headerText}>{translate('companyName')}:</p>
                <p className={detailText}>{details.companyName}</p>
              </div>
              <div className={groupingClass}>
                <p className={headerText}>{translate('contactPersonPhone')}:</p>
                <p className={detailText}>{details.contactPhone}</p>
              </div>
              <div className={groupingClass}>
                <p className={headerText}>{translate('contactPersonEmail')}:</p>
                <p className={detailText}>{details.contactEmail}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderDetails = () => {
    return (
      <div className="relative">
        {renderDetailsHeader()}
        {renderDetailsContent()}
        <div className="w-full flex">
          {renderArrowButton(openDropdown ? 'left' : 'right')}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{workField1}</h2>
          {!!workArea && (
            <div className={'font-bold text-md text-black text-right ml-6'}>
              {workArea}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          {!!from && !!to && (
            <div className={itemClasses}>
              {format(from)} - {format(to)}
            </div>
          )}
          {!!created && (
            <div className={itemClasses + ' text-right'}>
              {translate('listingAddedTime')} {format(created)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPurchaseButtons = () => {
    if (!!details) return null;
    return (
      <div className="flex justify-between mt-4 w-full">
        <button
          onClick={() => handlePayment()}
          className={detailsButton + ' text-gray-700 bg-gray-200'}
        >
          {translate('register')}
        </button>
        <button
          onClick={() => handlePayment()}
          className={detailsButton + ' text-white bg-green-500'}
        >
          {translate('paymentEuro')}
        </button>
      </div>
    );
  };

  const renderArrowButton = direction => {
    return (
      <button
        className="ml-auto"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <Icon.DoubleArrow
          direction="right"
          transform={direction === 'right' ? 'scale(1,1)' : 'scale(-1,1)'}
          className="w-16 h-8 text-green-600"
        />
      </button>
    );
  };

  const detailBoxWidth = !details ? 'w-10/12' : 'w-full';

  return (
    <motion.div
      key={created}
      className="shadow-lg rounded-lg bg-green-100 p-6 my-8"
    >
      {renderHeader()}

      <div className="flex mt-4 items-center">
        <div className={detailBoxWidth}>
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
        {!details && renderArrowButton('right')}
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
