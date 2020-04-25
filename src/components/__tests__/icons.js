import React from 'react';
import {render} from '@testing-library/react';
import {Icon} from '../icons';

describe('Icons', function() {
  describe('Number icon', function() {
    it('should throw an error when no value is passed', async function() {
      const log = console.error;
      console.error = jest.fn();

      expect(() => render(<Icon.Number />)).toThrowErrorMatchingInlineSnapshot(
        `"Prop \\"value\\" must be specified for number icon."`
      );

      console.error = log;
    });
  });
});
