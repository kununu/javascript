import getProfileLink from '.';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    publicFqdn: 'https://kununu.com',
    server: {name: 'app-profiles'},
  },
}));

describe('getProfileLink', () => {
  it('should return reviews link in DE language', () => {
    const result = getProfileLink({
      link: 'AP_REVIEWS_LINK',
      params: {
        countryCode: 'de',
        slug: 'kununu',
      },
    });

    expect(result).toBe('/de/kununu/kommentare');
  });

  it('should return reviews link in DE language', () => {
    const result = getProfileLink({
      link: 'AP_REVIEWS_LINK',
      params: {
        countryCode: 'de',
        slug: 'kununu',
      },
    });

    expect(result).toBe('/de/kununu/kommentare');
  });

  it('should return reviews link in EN language', () => {
    const result = getProfileLink({
      link: 'AP_REVIEWS_LINK',
      params: {
        countryCode: 'us',
        slug: 'kununu',
      },
    });

    expect(result).toBe('/us/kununu/reviews');
  });

  it('should include publicFqdn', () => {
    const result = getProfileLink({
      includeFQN: true,
      link: 'AP_REVIEWS_LINK',
      params: {
        countryCode: 'us',
        slug: 'kununu',
      },
    });

    expect(result).toBe('https://kununu.com/us/kununu/reviews');
  });

  it('should handle undefined parameter', () => {
    const result = getProfileLink({
      link: 'AP_ADD_REVIEW_LINK',
      params: {
        countryCode: 'us',
        slug: 'kununu',
        uuid: undefined,
      },
    });

    expect(result).toBe('/us/insights?forms=bewerten,gehalt,kultur');
  });

  it('should handle if no pathname is passed', () => {
    const result = getProfileLink({
      link: 'AP_SUMMARY_LINK',
      params: {
        countryCode: 'us',
        slug: 'kununu',
      },
    });

    expect(result).toBe('/us/kununu');
  });
});
