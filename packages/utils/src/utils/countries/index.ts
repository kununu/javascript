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

export const getCountriesByLocale = (
  locale: string,
): Array<{id: string; label: string; value: string}> => {
  if (dachCountries.find(country => country.id === locale)) {
    return dachCountries;
  }

  return otherCountries;
};

export const getCountryByLocale = (locale: string): string => {
  if (dachCountries.find(country => country.id === locale)) {
    return dachCountries.find(country => country.value === locale).label;
  }

  return otherCountries.find(country => country.value === locale).label;
};

export function isDach (locale: string): boolean {
  return ['at', 'ch', 'de'].includes(locale);
}

export function isUSLocale (locale: string): boolean {
  return locale === 'us';
}
