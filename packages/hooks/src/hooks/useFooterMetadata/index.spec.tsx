import metadata from '../../../__mocks__/metadata';

import useFooterMetadata from '.';

const useAppSelector = jest.spyOn(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../..'),
  'useAppSelector',
);

describe('useFooterMetadata', () => {
  it('should return the footer metadata', () => {
    const query = {
      countryCode: 'at',
    };

    useAppSelector.mockImplementation(() => metadata);
    const footer = useFooterMetadata('/at/kununu', query, '');

    expect(footer).toEqual(metadata.footer);
  });

  it('should fill the languages with the correct link with x-lang param', () => {
    const query = {
      countryCode: 'at',
    };

    useAppSelector.mockImplementation(() => metadata);
    const footer = useFooterMetadata('/at/kununu', query, '');

    expect(footer.languages).toEqual([
      {
        code: 'de',
        link: '/at/kununu?x-lang=de_DE',
        locale: 'de_DE',
        title: 'Deutsch',
      },
      {
        code: 'us',
        link: '/at/kununu?x-lang=en_US',
        locale: 'en_US',
        title: 'English',
      },
    ]);
  });
});
