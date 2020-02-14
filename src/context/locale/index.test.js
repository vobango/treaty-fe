import React from 'react';
import {render, screen} from '@testing-library/react';
import {useLocaleState, LocaleProvider, locales} from './index';

describe('Locale context', function() {
  // Simple component to test out context
  const Component = () => {
    const locale = useLocaleState();

    return <div>{locale}</div>;
  };

  describe('useLocaleState hook', function() {
    it('should return the current context value', function() {
      render(
        <LocaleProvider>
          <Component />
        </LocaleProvider>
      );

      expect(screen.getByText(locales.EN)).toBeDefined();
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
