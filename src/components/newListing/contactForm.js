import * as React from 'react';
import {useLocale} from '../../providers/locale';
import {useListingForm} from '../../providers/newListing';

function ContactInfo({onSubmit}) {
  const {translate} = useLocale();
  const {state, update, validate} = useListingForm();
  const handleChange = key => event => {
    update(key)(event.target.value);
  };
  const inputs = [
    {
      id: 'contactName',
      label: translate('contactPersonName'),
      error: translate('contactPersonNameInvalid')
    },
    {
      id: 'companyName',
      label: translate('companyName'),
      error: translate('companyNameInvalid')
    },
    {
      id: 'contactPhone',
      label: translate('contactPersonPhone'),
      error: translate('contactPersonPhoneInvalid')
    },
    {
      id: 'contactEmail',
      label: translate('contactPersonEmail'),
      error: translate('contactPersonEmailInvalid')
    }
  ];

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      {inputs.map(({id, label, error}, index) => (
        <React.Fragment key={id}>
          <div className="flex items-baseline">
            <label className="mt-4 mb-1 text-gray-700" htmlFor={id}>
              {label}
            </label>
            {!validate(id) && (
              <span className="ml-2 text-xs text-red-500">{error}</span>
            )}
          </div>
          <input
            className="input w-full"
            autoFocus={index === 0}
            id={id}
            value={state[id]}
            onChange={handleChange(id)}
          />
        </React.Fragment>
      ))}
      <input type="submit" className="hidden" />
    </form>
  );
}

export default ContactInfo;
