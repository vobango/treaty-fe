import React from 'react';
import {useHistory} from 'react-router-dom';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import NewListingForm from '../components/newListingForm';
import ContactInfo from '../components/newListingContactInfo';
import ListingPreview from '../components/newListingPreview';

const OfferWork = () => {
  const {translate} = useLocale();
  const {
    workerCount,
    dateRange,
    workField,
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
  const sendPost = () => {
    firebase.doAddPost({
      workerCount,
      dateRange,
      workField,
      workArea,
      post: additionalInfo,
      contactName,
      contactEmail,
      contactPhone,
      companyName
    });
    history.push('/home');
  };
  const [currentStep, setStep] = React.useState(1);
  const setValidation = state => update('formValid')(state);
  const validateContactForm = () => {
    if (!companyName || !contactName || !contactPhone || !contactEmail) {
      setValidation(false);
    } else {
      setValidation(true);
      setStep(3);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-auto w-full md:items-center px-4">
        <h1 className="text-2xl md:text-3xl text-center">
          {translate('offerWork')}
        </h1>
        <div className="md:w-1/3 lg:w-1/4">
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
                      : 'bg-gray-200 border-gray-200 text-gray-600'
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
              <NewListingForm />
              <button
                className="mt-16 button primary"
                onClick={() => setStep(2)}
              >
                {translate('nextPage')}
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <ContactInfo />
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuthorization()(OfferWork);
