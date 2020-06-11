import * as React from 'react';
import {useLocale} from '../../providers/locale';
import {useListingForm} from '../../providers/newListing';
import {formatDate} from '../../utils/helpers';

function ListingPreview() {
  const {translate} = useLocale();
  const {
    workerCount,
    startDate,
    endDate,
    workArea,
    workField1,
    workField2,
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
      value: `${formatDate(startDate)} - ${formatDate(endDate)}`
    },
    {key: 'chooseField', label: '1', value: workField1},
    {key: 'chooseField', label: '2', value: workField2},
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
      {fields.map(({key, label, value}, index) => {
        return (
          <div key={`${key}-${index}`} className="my-2">
            <span className="text-sm text-gray-700">
              {translate(key)}
              {!!label && ` ${label}`}:
            </span>
            <span className="ml-3">{value || '-'}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ListingPreview;
