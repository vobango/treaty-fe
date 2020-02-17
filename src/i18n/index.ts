import data from './keys.json';
import {locales} from '../context/locale';

const translations: {[index: string]: any} = data;
export const translator = (locale: string) => {
  if (!Object.values(locales).includes(locale))
    throw new Error(`Locale "${locale}" does not exist in defined locales`);

  return (key: string): string => {
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
