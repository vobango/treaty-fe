import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {MobileMenu} from '../menus/mobile';
import {renderWithLocale} from '../../utils/forTests';

describe('Mobile menu component', function() {
  const err = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = err;
  });

  it('should render without crashing', async function() {
    renderWithLocale(<MobileMenu />);
  });

  it('should toggle the menu on button click', async function() {
    renderWithLocale(<MobileMenu />);

    // Menu links should not be visible
    expect(screen.queryAllByRole('link').length).toBe(0);

    // Open menu and verify nav links are displayed
    await fireEvent.click(screen.getByRole('button'));
    expect(screen.queryAllByRole('link').length).toBeGreaterThan(0);

    // Close menu and verify it's closed
    await fireEvent.click(screen.getByRole('button'));
    expect(screen.queryAllByRole('link').length).toBe(0);
  });

  it('should close the menu on nav link click', async function() {
    renderWithLocale(<MobileMenu />);

    // Open menu and click on first link
    await fireEvent.click(screen.getByRole('button'));
    await fireEvent.click(screen.getAllByRole('link')[0]);

    // Links should be hidden
    expect(screen.queryAllByRole('link').length).toBe(0);
  });
});
