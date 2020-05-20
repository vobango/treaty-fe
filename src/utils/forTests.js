import {render} from '@testing-library/react';
import {LocaleProvider} from '../providers/locale';
import React from 'react';
import {translator} from './i18n';

export const renderWithLocale = child => {
  return render(<LocaleProvider>{child}</LocaleProvider>);
};

export const translate = key => translator('et')(key);

export const successResponse = () =>
  Promise.resolve(JSON.stringify({ok: true}));

export const errorResponse = () => Promise.reject('error');
