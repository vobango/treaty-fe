import * as React from 'react';
import {useLocale} from '../../providers/locale';
import {useListingForm} from '../../providers/newListing';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import en from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('en', en);
setDefaultLocale('en');

export default function ListingForm({onSubmit}) {
  const {translate} = useLocale();
  const {state, update, validate} = useListingForm();
  const handleChange = key => event => {
    const value = event.target ? event.target.value : event;
    update(key)(value);
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label className="mt-4 mb-1 text-gray-700" htmlFor="worker-count">
        {translate('workerCount')}
      </label>
      <input
        id="worker-count"
        className="input w-full md:w-1/2"
        value={state.workerCount}
        type="number"
        min="1"
        max="99"
        placeholder="1-99"
        required
        autoFocus
        onChange={handleChange('workerCount')}
      />
      {!validate('workerCount') && (
        <span className="text-xs text-red-500">
          {translate('errors.inputEmpty')}
        </span>
      )}
      <div className="mt-8 grid md:grid-cols-2 col-gap-3 row-gap-3">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="start-date">
            {translate('dateStart')}
          </label>
          <DatePicker
            dateFormat="dd.MM.yy"
            id="start-date"
            placeholderText="pp.kk.aa"
            className="input w-full"
            minDate={new Date()}
            selected={state.startDate}
            onChange={handleChange('startDate')}
          />
          {!validate('startDate') && (
            <span className="text-xs text-red-500">
              {translate('errors.inputEmpty')}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="end-date">
            {translate('dateEnd')}
          </label>
          <DatePicker
            dateFormat="dd.MM.yy"
            id="end-date"
            placeholderText="pp.kk.aa"
            className="input w-full"
            minDate={state.startDate || new Date()}
            selected={state.endDate}
            onChange={handleChange('endDate')}
          />
          {!validate('endDate') && (
            <span className="text-xs text-red-500">
              {translate('errors.inputEmpty')}
            </span>
          )}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 col-gap-3 row-gap-3">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="job-type">
            {translate('chooseField')} 1
          </label>
          <select
            id="job-type"
            className="input bg-white p-2 pl-0 w-full md:w-auto"
            required
            value={state.workField1}
            onChange={handleChange('workField1')}
          >
            {state.jobs.map((job, i) => (
              <option key={job} value={job} hidden={i === 0}>
                {job}
              </option>
            ))}
          </select>
          {!validate('workField1') && (
            <span className="text-xs text-red-500">
              {translate('errors.inputEmpty')}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700" htmlFor="job-type">
            {translate('chooseField')} 2{' '}
            <span className="text-sm text-gray-600">
              {translate('otherInfoCondition')}
            </span>
          </label>
          <select
            id="job-type"
            className="input bg-white p-2 pl-0 w-full md:w-auto"
            value={state.workField2}
            onChange={handleChange('workField2')}
          >
            {state.jobs.map((job, i) => (
              <option key={job} value={job} hidden={i === 0}>
                {job}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-8 md:w-1/2 pr-1">
        <label className="mb-1 text-gray-700" htmlFor="work-area">
          {translate('chooseArea')}
        </label>
        <select
          id="work-area"
          className="input bg-white p-3 pl-0 w-full"
          required
          onChange={handleChange('workArea')}
          value={state.workArea}
        >
          {state.areas.map(area => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {!validate('workArea') && (
          <span className="text-xs text-red-500">
            {translate('errors.inputEmpty')}
          </span>
        )}
      </div>
      <label className="mt-8 mb-1 text-gray-700" htmlFor="additional-info">
        {translate('otherInfo')}{' '}
        <span className="text-sm text-gray-600">
          {translate('otherInfoCondition')}
        </span>
      </label>
      <textarea
        id="additional-info"
        className="input w-full"
        value={state.additionalInfo}
        maxLength={100}
        rows={3}
        onChange={handleChange('additionalInfo')}
      />
      <div className="text-sm text-gray-600">
        {state.additionalInfo.length}/100 {translate('characters')}
      </div>
      <input type="submit" className="hidden" />
    </form>
  );
}
