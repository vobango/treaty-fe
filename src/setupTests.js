// custom jest matchers - https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// easily mock the fetch API - https://github.com/jefflau/jest-fetch-mock
import {enableFetchMocks} from 'jest-fetch-mock';
enableFetchMocks();

const findMatch = query => {
  const value = query.match(/\d+/);
  return /max/.test(query)
    ? window.innerWidth <= value
    : window.innerWidth >= value;
};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: findMatch(query),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
