import data from './keys.json';

const translations: {[index: string]: any} = data;
export const translator = (locale: string) => (key: string): string => {
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
