import {translator} from './index';

describe('Translator', function() {
  const warn = console.warn;
  afterEach(() => {
    console.warn = warn;
  });

  it('should return a function', function() {
    expect(typeof translator('')).toBe('function');
  });

  it('should return a string after given a locale', function() {
    const translateEN = translator('en');
    expect(translateEN('test')).toBeTruthy();
  });

  it('should log a warning if given key does not exist', function() {
    const consoleOutput = [];
    console.warn = message => consoleOutput.push(message);

    translator('en')('INVALID_KEY');

    expect(consoleOutput.length).toBe(1);
  });

  it('should log a warning if a value for given key in the given locale does not exist', function() {
    const consoleOutput = [];
    console.warn = message => consoleOutput.push(message);

    translator('UNKNOWN_LOCALE')('test');

    expect(consoleOutput.length).toBe(1);
  });
});
