import data from './keys.json';
import {locales} from '../../providers/locale';

const translations = data;
export const translator = locale => {
  if (!Object.values(locales).includes(locale))
    throw new Error(`Locale "${locale}" does not exist in defined locales`);

  return key => {
    const value = translations[key];

    if (!value) {
      console.warn(`Unknown key: "${key}"`);
      return key;
    }

    if (!value[locale]) {
      console.warn(`No value for key "${key}" in locale "${locale}"`);
      return key;
    }

    return value[locale];
  };
};
