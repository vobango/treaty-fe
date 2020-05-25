import React from 'react';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import NewListingForm from '../components/newListingForm';

const OfferWork = () => {
  const {translate} = useLocale();
  const {
    workerCount,
    dateRange,
    workField,
    workArea,
    additionalInfo
  } = useListingForm();
  const firebase = useFirebase();
  const sendPost = () => {
    firebase.doAddPost({
      workersNeeded: workerCount,
      dateRange,
      workField,
      workArea,
      post: additionalInfo
    });
  };
  const [currentStep, setStep] = React.useState(1);

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
              <button className="mt-16 entry-button" onClick={() => setStep(2)}>
                {translate('nextPage')}
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div>Kontaktandmed</div>
              <div>
                <button onClick={() => setStep(1)}>
                  {translate('previousPage')}
                </button>
                <button onClick={() => setStep(3)}>
                  {translate('nextPage')}
                </button>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div>Eelvaade</div>
              <div>
                <button onClick={() => setStep(2)}>
                  {translate('previousPage')}
                </button>
                <button onClick={sendPost}>
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
