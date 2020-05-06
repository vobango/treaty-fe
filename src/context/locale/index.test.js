import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {useLocale, locales} from './index';
import {renderWithLocale} from '../../testUtils';

describe('Locale context', function() {
  // Simple component to test out context
  const Component = () => {
    const {locale, setLocale, translate} = useLocale();

    return (
      <div>
        <div>{locale}</div>
        <button onClick={() => setLocale(locales.ET)}>Change locale</button>
        <p>{translate('test')}</p>
      </div>
    );
  };

  describe('useLocaleState hook', function() {
    it('should return the current context value', function() {
      renderWithLocale(<Component />);

      // Assume EN is the default locale
      expect(screen.getByText(locales.ET)).toBeDefined();
    });

    it('should return a function to update locale', async function() {
      renderWithLocale(<Component />);

      await fireEvent.click(screen.getByText(/change locale/i));

      expect(screen.getByText(locales.ET)).toBeDefined();
    });

    it('should return a function to translate keys with given locale', function() {
      renderWithLocale(<Component />);
    });

    it('should throw an error if used outside of context provider', function() {
      //Remove console error because it is expected and unnecessary in this case
      const log = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<Component />);
      }).toThrow();

      console.error = log;
    });
  });
});
