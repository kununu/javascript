import {
  dachCountries,
  getCountriesByLocale,
  getCountryByLocale,
  isDach,
  isUSLocale,
  otherCountries,
} from '.';

describe('countries', () => {
  describe('getCountriesByLocale', () => {
    it('returns the an array of all dach locales, when a dach country is provided', () => {
      expect(getCountriesByLocale('at')).toEqual(dachCountries);
      expect(getCountriesByLocale('de')).toEqual(dachCountries);
      expect(getCountriesByLocale('ch')).toEqual(dachCountries);
    });

    it('returns the other locales, when a non dach country code is provided', () => {
      expect(getCountriesByLocale('us')).toEqual(otherCountries);
    });
  });

  describe('getCountryByLocale', () => {
    it('returns name of county, when a locale', () => {
      expect(getCountryByLocale('at')).toEqual('Österreich');
      expect(getCountryByLocale('de')).toEqual('Deutschland');
      expect(getCountryByLocale('ch')).toEqual('Schweiz');
      expect(getCountryByLocale('us')).toEqual('United States');
    });
  });

  describe('isDach', () => {
    it('returns true when a dach locale id is provided', () => {
      expect(isDach('at')).toEqual(true);
      expect(isDach('de')).toEqual(true);
      expect(isDach('ch')).toEqual(true);
    });

    it('returns false when a non-dach locale id is provided', () => {
      expect(isDach('us')).toEqual(false);
    });
  });

  describe('isUSLocale', () => {
    it('returns true when a us locale id is provided', () => {
      expect(isUSLocale('us')).toEqual(true);
    });

    it('returns false when a dach locale id is provided', () => {
      expect(isUSLocale('at')).toEqual(false);
      expect(isUSLocale('de')).toEqual(false);
      expect(isUSLocale('ch')).toEqual(false);
    });
  });
});
