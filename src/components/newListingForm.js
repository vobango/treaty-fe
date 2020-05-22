import * as React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';

export default function NewListingForm() {
  const {translate} = useLocale();
  const {state, update} = useListingForm();
  const handleChange = key => event => {
    update(key)(event.target.value);
  };

  return (
    <form className="flex flex-col">
      <label className="mt-12 mb-2" htmlFor="worker-count">
        {translate('countWorkersNeeded')}
      </label>
      <input
        id="worker-count"
        className="border-b-2 mr-auto p-2"
        value={state.workerCount}
        type="number"
        min="1"
        max="99"
        onChange={handleChange('workerCount')}
      />
      <label className="mt-12 mb-2" htmlFor="date-range">
        {translate('pickDateRange')}
      </label>
      <DateRangePicker
        id="date-range"
        className="mr-auto border-0 border-b-2"
        value={state.dateRange}
        onChange={dates => update('dateRange')(dates)}
      />
      <label className="mt-12 mb-2" htmlFor="job-type">
        {translate('chooseField')}
      </label>
      <select
        id="job-type"
        className="mr-auto bg-white border-b-2 p-2 pl-0"
        value={state.workField}
        onChange={handleChange('workField')}
      >
        {state.jobs.map(job => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      <label className="mt-12 mb-2" htmlFor="work-area">
        {translate('chooseArea')}
      </label>
      <select
        id="work-area"
        className="mr-auto bg-white border-b-2 p-2 pl-0"
        onChange={handleChange('workArea')}
        value={state.workArea}
      >
        {state.areas.map(area => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      <label className="mt-12 mb-2" htmlFor="additional-info">
        {translate('otherInfo')}{' '}
        <span className="text-sm text-gray-600">
          {translate('otherInfoCondition')}
        </span>
      </label>
      <input
        id="additional-info"
        className="input-box"
        value={state.additionalInfo}
        maxLength={100}
        onChange={handleChange('additionalInfo')}
      />
    </form>
  );
}
