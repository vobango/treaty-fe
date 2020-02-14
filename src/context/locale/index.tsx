import React, {Dispatch, SetStateAction} from 'react';

type ProviderProps = {children: React.ReactNode};
const locales = {
  EN: 'en',
  ET: 'ET'
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

function useLocaleState() {
  const context = React.useContext(LocaleStateContext);
  if (context === undefined) {
    throw new Error(
      'Locale state must be used within LocaleProvider component!'
    );
  }

  return context;
}

export {useLocaleState, LocaleProvider, locales};
