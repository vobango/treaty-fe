import * as React from 'react';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';

function ContactInfo() {
  const {translate} = useLocale();
  const {state, update} = useListingForm();
  const handleChange = key => event => {
    update(key)(event.target.value);
  };
  const isInvalid = key => !state.formValid && !state[key];

  return (
    <form className="flex flex-col">
      <div className="flex items-baseline">
        <label className="mt-4 mb-1 text-gray-700" htmlFor="contact-name">
          {translate('contactPersonName')}
        </label>
        {isInvalid('contactName') && (
          <span className="ml-2 text-xs text-red-500">
            {translate('contactPersonNameInvalid')}
          </span>
        )}
      </div>
      <input
        className="border-b-2 mr-auto p-1"
        id="contact-name"
        value={state.contactName}
        onChange={handleChange('contactName')}
      />
      <div className="flex items-baseline">
        <label className="mt-8 mb-1 text-gray-700" htmlFor="company-name">
          {translate('companyName')}
        </label>
        {isInvalid('companyName') && (
          <span className="ml-2 text-xs text-red-500">
            {translate('companyNameInvalid')}
          </span>
        )}
      </div>
      <input
        className="border-b-2 mr-auto p-1"
        id="company-name"
        value={state.companyName}
        onChange={handleChange('companyName')}
      />
      <div className="flex items-baseline">
        <label className="mt-8 mb-1 text-gray-700" htmlFor="contact-phone">
          {translate('contactPersonPhone')}
        </label>
        {isInvalid('contactPhone') && (
          <span className="ml-2 text-xs text-red-500">
            {translate('contactPersonPhoneInvalid')}
          </span>
        )}
      </div>
      <input
        className="border-b-2 mr-auto p-1"
        id="contact-phone"
        value={state.contactPhone}
        onChange={handleChange('contactPhone')}
      />
      <div className="flex items-baseline">
        <label className="mt-8 mb-1 text-gray-700" htmlFor="contact-email">
          {translate('contactPersonEmail')}
        </label>
        {isInvalid('contactEmail') && (
          <span className="ml-2 text-xs text-red-500">
            {translate('contactPersonEmailInvalid')}
          </span>
        )}
      </div>
      <input
        className="border-b-2 mr-auto p-1"
        id="contact-email"
        value={state.contactEmail}
        onChange={handleChange('contactEmail')}
      />
    </form>
  );
}

export default ContactInfo;
