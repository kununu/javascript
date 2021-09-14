export const dachCountries = [
  {
    id: 'at',
    label: 'Österreich',
    value: 'at',
  },
  {
    id: 'de',
    label: 'Deutschland',
    value: 'de',
  },
  {
    id: 'ch',
    label: 'Schweiz',
    value: 'ch',
  },
];

export const otherCountries = [
  {
    id: 'us',
    label: 'United States',
    value: 'us',
  },
];

/**
 * Returns the available countries for either dach or us
 *
 * @param {string} locale
 */
export const getCountriesByLocale = (
  locale: string,
): Array<{id: string; label: string; value: string}> => {
  if (dachCountries.find(country => country.id === locale)) {
    return dachCountries;
  }

  return otherCountries;
};

/**
 * Returns the country that matches the locale
 *
 * @param {string} locale
 */
export const getCountryByLocale = (locale: string): string => {
  if (dachCountries.find(country => country.id === locale)) {
    return dachCountries.find(country => country.value === locale).label;
  }

  return otherCountries.find(country => country.value === locale).label;
};

/**
 * Checks if locale refers to Dach
 *
 * @param {string} locale
 */
export function isDach (locale: string): boolean {
  return ['at', 'ch', 'de'].includes(locale);
}

/**
 * Checks if locale refers to US
 *
 * @param {string} locale
 */
export function isUSLocale (locale: string): boolean {
  return locale === 'us';
}
