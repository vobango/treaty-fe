import React from 'react';
import {screen} from '@testing-library/react';
import {renderWithLocale} from '../testUtils';
import LandingPage from './index';
import {screens} from '../utils/constants';
import {BrowserRouter} from 'react-router-dom';

describe('Landing page component', function() {
  const renderLandingPage = () =>
    renderWithLocale(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

  it('should render without crashing', function() {
    renderLandingPage();
  });

  it('should show desktop menu on larger screens', function() {
    window.innerWidth = screens.DESKTOP_MIN_WIDTH;

    renderLandingPage();

    expect(screen.getByTestId('desktop-menu')).toBeInTheDocument();
    // Make sure mobile menu is not displayed
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  // TODO: is there a way to check different screen sizes in one test?
  it('should show mobile menu on smaller screens', async function() {
    window.innerWidth = screens.DESKTOP_MIN_WIDTH - 1;

    renderLandingPage();

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    // Make sure desktop menu is not displayed
    expect(screen.queryByTestId('desktop-menu')).not.toBeInTheDocument();
  });
});
