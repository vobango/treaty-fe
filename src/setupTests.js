// custom jest matchers - https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// easily mock the fetch API - https://github.com/jefflau/jest-fetch-mock
import {enableFetchMocks} from 'jest-fetch-mock';
enableFetchMocks();
