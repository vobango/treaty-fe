import React from 'react';
import {useLocale} from './locale';
import {jobTypes, workAreas} from '../utils/constants';

const StateContext = React.createContext(undefined);
const StateModifierContext = React.createContext(undefined);

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE': {
      const {key, value} = action.payload;
      return {...state, [key]: value};
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

function ListingStateProvider({children}) {
  const {translate} = useLocale();
  // Translate and sort values alphabetically
  const jobs = jobTypes.map(translate);
  jobs.sort((a, b) => a.localeCompare(b));
  const translatedAreas = {
    cities: workAreas.cities.map(translate),
    counties: workAreas.counties.map(translate),
    countries: workAreas.countries.map(translate)
  };
  let areas = [];
  Object.values(translatedAreas).forEach(group => {
    group.sort((a, b) => a.localeCompare(b));
    areas = areas.concat(group);
  });
  // Listing form fields
  const initialState = {
    workerCount: 1,
    dateRange: [
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 2))
    ],
    workField: jobs[0],
    workArea: areas[0],
    additionalInfo: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    formValid: true,
    jobs,
    areas
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const update = key => value => {
    dispatch({
      type: 'UPDATE',
      payload: {key, value}
    });
  };

  return (
    <StateContext.Provider value={state}>
      <StateModifierContext.Provider value={update}>
        {children}
      </StateModifierContext.Provider>
    </StateContext.Provider>
  );
}

function useListingForm() {
  const state = React.useContext(StateContext);
  const update = React.useContext(StateModifierContext);

  if (!state || !update) {
    throw new Error(
      'Listing form state used outside of ListingStateProvider component!'
    );
  }

  return {state, ...state, update};
}

export {ListingStateProvider, useListingForm};
