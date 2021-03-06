import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import ListingForm from '../components/newListing/listingForm';
import ContactInfo from '../components/newListing/contactForm';
import ListingPreview from '../components/newListing/preview';
import {HOME} from '../utils/routes';
import Portal from '../components/portal';
import request from '../utils/request';
import {useAuth} from '../providers/authentication';

const OfferWork = () => {
  const {translate} = useLocale();
  const {
    workerCount,
    startDate,
    endDate,
    workField1,
    workField2,
    workArea,
    additionalInfo,
    contactName,
    contactEmail,
    contactPhone,
    companyName,
    update
  } = useListingForm();
  const firebase = useFirebase();
  const history = useHistory();
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const listingType = searchParams.get('type') || 'job';
  const {email} = useAuth();
  const sendNotification = listingId => {
    request('/.netlify/functions/notifications', {
      body: {
        ignore: email,
        title: `${translate(
          `listing.${listingType}`
        )}: ${workField1.toLowerCase()}, ${workArea}`,
        link: `http://cofind.eu/listings?type=${listingType}&id=${listingId}`,
        text: translate('otherInfo')
      }
    });
  };
  const sendPost = async () => {
    const newPostId = await firebase.doAddPost({
      workerCount,
      startDate,
      endDate,
      workField1,
      workField2,
      workArea,
      post: additionalInfo,
      contactName,
      contactEmail,
      contactPhone,
      companyName,
      type: listingType
    });
    sendNotification(newPostId);
    history.push(HOME);
  };
  const [showConfirm, setConfirm] = React.useState(false);
  const handleAbort = () => {
    const formHasChanges =
      workerCount ||
      startDate ||
      endDate ||
      workField1 ||
      workField2 ||
      workArea ||
      additionalInfo ||
      contactName ||
      contactEmail ||
      contactPhone ||
      companyName;
    setConfirm(formHasChanges);

    if (!formHasChanges) {
      history.push(HOME);
    }
  };
  const [currentStep, setStep] = React.useState(1);
  const setValidation = state => update('formValid')(state);
  const validateContactForm = event => {
    event.preventDefault();
    const isValid = companyName && contactName && contactPhone && contactEmail;

    setValidation(isValid);
    if (isValid) {
      setStep(3);
    }
  };
  const validateListingForm = event => {
    event.preventDefault();
    const isValid =
      workerCount && startDate && endDate && workField1 && workArea;

    setValidation(isValid);
    if (isValid) {
      setStep(2);
    }
  };
  const CancelButton = () => (
    <button
      className="block mt-10 mx-auto text-2xl text-gray-600"
      onClick={handleAbort}
    >
      {translate('abort')}
    </button>
  );

  return (
    <Layout>
      <div className="flex flex-col h-auto w-full sm:items-center px-4">
        <h1 className="text-2xl md:text-4xl text-center">
          {translate(listingType === 'job' ? 'offerWork' : 'offerWorkers')}
        </h1>
        <div className="lg:w-1/2 max-w-xl">
          <div className="flex justify-between px-4 my-6 w-full">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`flex items-center ${step < 3 && 'w-full'}`}
              >
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full border-2 text-xs sm:text-base ${
                    step === currentStep
                      ? 'bg-white text-green-600 border-green-500 font-bold'
                      : step < currentStep
                      ? 'bg-green-200 border-green-200 text-green-700'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <span
                    className={`block h-0 flex-grow border-b-2 ${
                      step < currentStep
                        ? 'border-green-200'
                        : 'border-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <>
              <ListingForm onSubmit={validateListingForm} />
              <button
                className="mt-16 button primary"
                onClick={validateListingForm}
              >
                {translate('nextPage')}
              </button>
              <CancelButton />
            </>
          )}
          {currentStep === 2 && (
            <>
              <ContactInfo onSubmit={validateContactForm} />
              <div className="mt-16 grid grid-cols-2 col-gap-4">
                <button
                  className="button ghost"
                  onClick={() => {
                    setValidation(true);
                    setStep(1);
                  }}
                >
                  {translate('previousPage')}
                </button>
                <button
                  className="button primary"
                  onClick={validateContactForm}
                >
                  {translate('nextPage')}
                </button>
              </div>
              <CancelButton />
            </>
          )}
          {currentStep === 3 && (
            <>
              <ListingPreview />
              <div className="mt-16 grid grid-cols-2 col-gap-4">
                <button
                  className="button ghost text-xl"
                  onClick={() => setStep(2)}
                >
                  {translate('previousPage')}
                </button>
                <button className="button primary text-xl" onClick={sendPost}>
                  {translate('submitNewListing')}
                </button>
              </div>
              <CancelButton />
            </>
          )}
          {showConfirm && (
            <Portal id="form-abort-confirm">
              <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0" />
                <div className="bg-white rounded-lg relative z-10 py-4">
                  <h1 className="text-xl font-bold mx-4">
                    Kas soovid lõpetada kuulutuse lisamise?
                  </h1>
                  <div className="border-2" />
                  <p className="mx-4 my-8">
                    Lõpetades kaovad kõik tehtud muudatused!
                  </p>
                  <div className="flex justify-end mx-4">
                    <button
                      className="p-1 border-2 border-gray-600 text-gray-700 rounded hover:text-gray-800 hover:border-gray-700"
                      onClick={() => setConfirm(false)}
                    >
                      Jätka kuulutuse lisamist
                    </button>
                    <button
                      className="p-1 border-2 border-gray-600 text-gray-700 rounded hover:text-gray-800 hover:border-gray-700 ml-4"
                      onClick={() => history.push(HOME)}
                    >
                      Lõpeta
                    </button>
                  </div>
                </div>
              </div>
            </Portal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuthorization()(OfferWork);
