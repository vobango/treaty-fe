import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import NewListingForm from '../components/newListingForm';
import ContactInfo from '../components/newListingContactInfo';
import ListingPreview from '../components/newListingPreview';
import {HOME} from '../utils/routes';

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
  const sendPost = () => {
    firebase.doAddPost({
      workerCount,
      dateRange: {start: startDate, end: endDate},
      workField1,
      workField2,
      workArea,
      post: additionalInfo,
      contactName,
      contactEmail,
      contactPhone,
      companyName
    });
    history.push('/home');
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
      history.push('/home');
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

  return (
    <Layout>
      <div className="flex flex-col h-auto w-full md:items-center px-4">
        <h1 className="text-2xl md:text-4xl text-center">
          {translate('offerWork')}
        </h1>
        <div>
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
              <NewListingForm onSubmit={validateListingForm} />
              <button
                className="mt-16 button primary"
                onClick={validateListingForm}
              >
                {translate('nextPage')}
              </button>
              <Link to={HOME}>{translate('abort')}</Link>
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
