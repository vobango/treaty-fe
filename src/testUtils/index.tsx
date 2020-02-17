import {render} from '@testing-library/react';
import {LocaleProvider} from '../context/locale';
import React from 'react';

export const renderWithLocale = (child: React.FC) => {
  return render(<LocaleProvider>{child}</LocaleProvider>);
};
