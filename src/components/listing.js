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
  const {
    created,
    workArea,
    workField1,
    workField2,
    workerCount,
    dateRange = []
  } = post;
  const [from, to] = dateRange;
  const itemClasses = 'flex items-center text-sm font-light text-gray-700';
  const detailsButton =
    'text-sm uppercase rounded-lg py-3 px-6 tracking-wide xl:text-lg';
  const headerText =
    'font-bold text-sm w-1/3 md:w-1/4 flex justify-between items-center';
  const detailText = 'text-lg font-thin';
  const iconClasses = 'h-8 w-8 text-gray-600';
  const groupingClass = 'flex my-1';
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
        <div className="relative">
          <div>
            {!!workField1 && (
              <div className="flex">
                <p className={headerText}>Valdkond - 1</p>
                <p className={detailText}>{workField1}</p>
              </div>
            )}
            {!!workField2 && (
              <div className="flex">
                <p className={headerText}>Valdkond - 2</p>
                <p className={detailText}>{workField2}</p>
              </div>
            )}
          </div>
          {!!workerCount && (
            <div className="absolute top-0 right-0 mr-2 flex items-center">
              <Icon.Worker className={iconClasses} />
              {workerCount}
            </div>
          )}
        </div>
        {!!details.details && (
          <div className="my-4">
            <p className={headerText}>Lisainformatsioon</p>
            <p className={detailText}>{details.details}</p>
          </div>
        )}
        <hr className="my-3" />
        <div className="flex flex-col">
          <p className={'w-full mb-2 font-bold text-sm flex justify-center'}>
            Kontakt
          </p>
          <div className={groupingClass}>
            <p className={headerText}>Kontaktisik:</p>
            <p className={detailText}>{details.contactName}</p>
          </div>
          <div className={groupingClass}>
            <p className={headerText}>Ettevõte:</p>
            <p className={detailText}>{details.companyName}</p>
          </div>
          <div className={groupingClass}>
            <p className={headerText}>Telefon:</p>
            <p className={detailText}>{details.contactPhone}</p>
          </div>
          <div className={groupingClass}>
            <p className={headerText}>E-post:</p>
            <p className={detailText}>{details.contactEmail}</p>
          </div>
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
