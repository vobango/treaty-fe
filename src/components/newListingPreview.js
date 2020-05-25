import * as React from 'react';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';
import {formatDate} from '../utils/helpers';

function ListingPreview() {
  const {translate} = useLocale();
  const {
    workerCount,
    dateRange,
    workArea,
    workField,
    additionalInfo,
    contactName,
    contactEmail,
    contactPhone,
    companyName
  } = useListingForm();
  const fields = [
    {key: 'workerCount', value: workerCount},
    {
      key: 'pickDateRange',
      value: dateRange.map(d => formatDate(d)).join(' - ')
    },
    {key: 'chooseField', value: workField},
    {key: 'chooseArea', value: workArea},
    {key: 'otherInfo', value: additionalInfo},
    {key: 'contactPersonName', value: contactName},
    {key: 'companyName', value: companyName},
    {key: 'contactPersonPhone', value: contactPhone},
    {key: 'contactPersonEmail', value: contactEmail}
  ];

  return (
    <div>
      <h2 className="text-xl text-center mt-12 mb-6">
        {translate('listingPreview')}
      </h2>
      {fields.map(({key, value}) => {
        return (
          <div key={key} className="my-2">
            <span className="text-sm text-gray-700">{translate(key)}:</span>
            <span className="ml-3">{value || '-'}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ListingPreview;
