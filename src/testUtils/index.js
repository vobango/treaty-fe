import {render} from '@testing-library/react';
import {LocaleProvider} from '../context/locale/index';
import React from 'react';

export const renderWithLocale = child => {
  return render(<LocaleProvider>{child}</LocaleProvider>);
};
