import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {renderWithLocale} from '../testUtils';
import LandingPage from './index';
import {screens} from '../utils/constants';

describe('Landing page component', function() {
  const renderLandingPage = () => renderWithLocale(<LandingPage />);

  it('should render without crashing', function() {
    renderLandingPage();
  });

  it('should show all menu items on desktop', function() {
    window.innerWidth = screens.DESKTOP_MIN_WIDTH;

    renderLandingPage();

    // Check for a nav menu link
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    // Make sure menu button is not rendered
    expect(screen.queryByText(/menu/i)).not.toBeInTheDocument();
  });

  // TODO: is there a way to check different screen sizes in one test?
  it('should show a menu button on a smaller screen and open the nav links on click', async function() {
    window.innerWidth = screens.DESKTOP_MIN_WIDTH - 1;

    renderLandingPage();

    // Check for a menu button
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    // Make sure nav links are not rendered by default
    expect(screen.queryByText(/contact/i)).not.toBeInTheDocument();

    // Open the menu
    await fireEvent.click(screen.getByRole('button', {name: /menu/i}));
    // Menu should be open
    expect(screen.getByText(/contact/i)).toBeInTheDocument();

    // Close the menu
    await fireEvent.click(screen.getByRole('button', {name: /close/i}));
    // Make sure menu is hidden
    expect(screen.queryByText(/contact/i)).not.toBeInTheDocument();
  });
});
