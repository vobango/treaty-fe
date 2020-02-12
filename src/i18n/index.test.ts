import {translator} from './index';

describe('Translator', function() {
  it('should return a function', function() {
    expect(typeof translator('')).toBe('function');
  });

  it('should return a string after given a locale', function() {
    const translateET = translator('et');
    expect(translateET('')).toBe('');
  });

  it('should log a warning if given key does not exist', function() {
    const warn = console.warn;
    const consoleOutput = [];
    console.warn = (message: string) => consoleOutput.push(message);
    const translateET = translator('et');

    translateET('INVALID_KEY');

    expect(consoleOutput.length).toBe(1);

    console.warn = warn;
  });

  it('should log a warning if a value for given key in the given locale does not exist', function() {
    const warn = console.warn;
    const consoleOutput = [];
    console.warn = (message: string) => consoleOutput.push(message);

    translator('UNKNOWN_LOCALE')('test');

    expect(consoleOutput.length).toBe(1);

    console.warn = warn;
  });
});
