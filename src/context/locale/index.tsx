import React, {Dispatch, SetStateAction} from 'react';
import {translator} from '../../i18n';

type ProviderProps = {children: React.ReactNode};
const locales = {
  EN: 'en',
  ET: 'et',
  RU: 'ru'
};
const LocaleStateContext = React.createContext<string | undefined>(undefined);
const LocaleModifierContext = React.createContext<
  Dispatch<SetStateAction<string>> | undefined
>(undefined);

// Provider for consuming and setting locale
function LocaleProvider({children}: ProviderProps) {
  const [state, setState] = React.useState(locales.EN);
  return (
    <LocaleStateContext.Provider value={state}>
      <LocaleModifierContext.Provider value={setState}>
        {children}
      </LocaleModifierContext.Provider>
    </LocaleStateContext.Provider>
  );
}

function useLocale() {
  const locale = React.useContext(LocaleStateContext);
  const setLocale = React.useContext(LocaleModifierContext);

  if (locale === undefined || setLocale === undefined) {
    throw new Error(
      'Locale state must be used within LocaleProvider component!'
    );
  }

  return {locale, setLocale, translate: translator(locale)};
}

export {useLocale, LocaleProvider, locales};
