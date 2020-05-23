import React, {useState} from 'react';
import Layout from '../components/layout';
import {withFirebase} from '../providers/firebase';
import {withAuthorization} from '../components/session';
import {useLocale} from '../providers/locale';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {condition} from '../components/session/withAuthorization';
import {jobTypes, workAreas} from '../utils/constants';

const OfferWork = ({firebase}) => {
  const {translate} = useLocale();
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
        <h1>{translate('offerWork')}</h1>
        <form className="md:w-1/3 flex flex-col">
          <label className="my-8">
            {translate('countWorkersNeeded')}
            <input
              className="input-box"
              value={workersNeeded}
              type="number"
              min="1"
              max="99"
              onChange={e => setWorkersNeeded(e.target.value)}
            />
          </label>
          <label className="my-8">
            {translate('pickDateRange')}
            <DateRangePicker
              value={dateRange}
              onChange={date => setDateRange(date)}
            />
          </label>
          <label className="my-8">
            {translate('chooseField')}
            <select
              id="fields"
              onChange={event => setWorkField(event.target.value)}
            >
              {jobs.map(job => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </label>
          <label className="my-8">
            {translate('chooseArea')}
            <select
              id="area"
              onChange={event => setWorkArea(event.target.value)}
            >
              {mappedAreas.map(area => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
          <label className="my-8">
            {translate('otherInfo')}
            <input
              className="input-box"
              value={addPost}
              onChange={e => setAddPost(e.target.value)}
            />
          </label>
        </form>
        <button className="entry-button" onClick={() => sendPost()}>
          {translate('addListing')}
        </button>
      </div>
    </Layout>
  );
};

export default withFirebase(withAuthorization(condition)(OfferWork));
