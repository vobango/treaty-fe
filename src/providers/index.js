import * as React from 'react';
import {FirebaseProvider} from './firebase';
import {ReactQueryConfigProvider} from 'react-query';
import {queryConfig} from '../utils/constants';
import {LocaleProvider} from './locale';
import {AuthProvider} from './authentication';

export function Providers({children}) {
  return (
    <FirebaseProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        <AuthProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </AuthProvider>
      </ReactQueryConfigProvider>
    </FirebaseProvider>
  );
}
