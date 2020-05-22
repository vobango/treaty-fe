import React, {useState} from 'react';
import Layout from '../components/layout';
import {useFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {jobTypes, workAreas} from '../utils/constants';

const OfferWork = () => {
  const {translate} = useLocale();
  const firebase = useFirebase();
  const [addPost, setAddPost] = useState('');
  const [workersNeeded, setWorkersNeeded] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [workField, setWorkField] = useState('');
  const [workArea, setWorkArea] = useState('');
  const jobs = jobTypes.map(translate);
  jobs.sort((a, b) => a.localeCompare(b));
  const areas = {
    cities: workAreas.cities.map(translate),
    counties: workAreas.counties.map(translate),
    countries: workAreas.countries.map(translate)
  };
  let mappedAreas = [];
  Object.values(areas).forEach(group => {
    group.sort((a, b) => a.localeCompare(b));
    mappedAreas = mappedAreas.concat(group);
  });

  const sendPost = () => {
    firebase.doAddPost({
      workersNeeded,
      dateRange,
      workField,
      workArea,
      post: addPost
    });
  };
  return (
    <Layout>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <h1 className="text-3xl">{translate('offerWork')}</h1>
        <form className="md:w-1/3 lg:w-1/4 flex flex-col">
          <label className="mt-12 mb-2" htmlFor="worker-count">
            {translate('countWorkersNeeded')}
          </label>
          <input
            id="worker-count"
            className="border-b-2 mr-auto p-2"
            value={workersNeeded}
            type="number"
            min="1"
            max="99"
            onChange={e => setWorkersNeeded(e.target.value)}
          />
          <label className="mt-12 mb-2" htmlFor="date-range">
            {translate('pickDateRange')}
          </label>
          <DateRangePicker
            id="date-range"
            className="mr-auto border-0 border-b-2"
            value={dateRange}
            onChange={date => setDateRange(date)}
          />
          <label className="mt-12 mb-2" htmlFor="job-type">
            {translate('chooseField')}
          </label>
          <select
            id="job-type"
            className="mr-auto bg-white border-b-2 p-2 pl-0"
            onChange={e => setWorkField(e.target.value)}
          >
            {jobs.map(job => (
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
            onChange={e => setWorkArea(e.target.value)}
          >
            {mappedAreas.map(area => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <label className="mt-12 mb-2" htmlFor="additional-info">
            {translate('otherInfo')}
          </label>
          <input
            id="additional-info"
            className="input-box"
            value={addPost}
            onChange={e => setAddPost(e.target.value)}
          />
        </form>
        <button className="entry-button" onClick={sendPost}>
          {translate('addListing')}
        </button>
      </div>
    </Layout>
  );
};

export default withAuthorization()(OfferWork);
