import * as React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {useLocale} from '../providers/locale';
import {useListingForm} from '../providers/newListing';

export default function NewListingForm({onSubmit}) {
  const {translate} = useLocale();
  const {state, update} = useListingForm();
  const handleChange = key => event => {
    update(key)(event.target.value);
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label className="mt-4 mb-1 text-gray-700" htmlFor="worker-count">
        {translate('workerCount')}{' '}
        <span className="text-sm text-gray-600">
          {translate('workerCountCondition')}
        </span>
      </label>
      <input
        id="worker-count"
        className="input"
        value={state.workerCount}
        type="number"
        min="1"
        max="99"
        onChange={handleChange('workerCount')}
      />
      <label className="mt-8 mb-1 text-gray-700" htmlFor="date-range">
        {translate('pickDateRange')}
      </label>
      <DateRangePicker
        id="date-range"
        className="border-0 input"
        value={state.dateRange}
        onChange={dates => update('dateRange')(dates)}
      />
      <label className="mt-8 mb-1 text-gray-700" htmlFor="job-type">
        {translate('chooseField')}
      </label>
      <select
        id="job-type"
        className="input bg-white p-2 pl-0"
        value={state.workField}
        onChange={handleChange('workField')}
      >
        {state.jobs.map(job => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      <label className="mt-8 mb-1 text-gray-700" htmlFor="work-area">
        {translate('chooseArea')}
      </label>
      <select
        id="work-area"
        className="input bg-white p-2 pl-0"
        onChange={handleChange('workArea')}
        value={state.workArea}
      >
        {state.areas.map(area => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      <label className="mt-8 mb-1 text-gray-700" htmlFor="additional-info">
        {translate('otherInfo')}{' '}
        <span className="text-sm text-gray-600">
          {translate('otherInfoCondition')}
        </span>
      </label>
      <input
        id="additional-info"
        className="input w-full"
        value={state.additionalInfo}
        maxLength={100}
        onChange={handleChange('additionalInfo')}
      />
      <input type="submit" className="hidden" />
    </form>
  );
}
