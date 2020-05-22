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
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <h1 className="text-3xl">{translate('offerWork')}</h1>
        <div className="md:w-1/3 lg:w-1/4">
          <div className="flex justify-between px-4 my-6 w-full">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`flex items-center ${step < 3 && 'w-full'}`}
              >
                <div
                  className={`py-2 px-4 rounded-full text-sm ${
                    step === currentStep
                      ? 'bg-yellow-200 font-bold'
                      : step < currentStep
                      ? 'bg-green-200'
                      : 'bg-gray-200'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <span
                    className={`block h-0 w-full border-b-2 ${
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
