import React from 'react';
import {useLocale} from './locale';
import {jobTypes, workAreas} from '../utils/constants';

const StateContext = React.createContext(undefined);
const StateModifierContext = React.createContext(undefined);
const StateValidationContext = React.createContext(undefined);
const initialState = {
  workerCount: '',
  dateRange: {start: null, end: null},
  startDate: null,
  endDate: null,
  workField1: '',
  workField2: '',
  workArea: '',
  additionalInfo: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  companyName: '',
  formValid: true
};

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
  jobs.unshift('Vali');
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
  areas.unshift('Vali');
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    jobs,
    areas
  });
  const update = key => value => {
    dispatch({
      type: 'UPDATE',
      payload: {key, value}
    });
  };
  const validateField = key => !(!state.formValid && !state[key]);

  return (
    <StateContext.Provider value={state}>
      <StateModifierContext.Provider value={update}>
        <StateValidationContext.Provider value={validateField}>
          {children}
        </StateValidationContext.Provider>
      </StateModifierContext.Provider>
    </StateContext.Provider>
  );
}

function useListingForm() {
  const state = React.useContext(StateContext);
  const update = React.useContext(StateModifierContext);
  const validate = React.useContext(StateValidationContext);

  if (!state || !update || !validate) {
    throw new Error(
      'Listing form state used outside of ListingStateProvider component!'
    );
  }

  return {state, ...state, update, validate};
}

export {ListingStateProvider, useListingForm};
