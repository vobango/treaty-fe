import React from 'react';
import {renderWithLocale} from '../testUtils';
import LandingPage from './index';

describe('Landing page component', function() {
  it('should render without crashing', function() {
    renderWithLocale(<LandingPage />);
  });
});
