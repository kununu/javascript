
import getUrl from '.';

describe('getUrl', () => {
  const query = {
    countryCode: 'at',
    name: 'page',
    slug: 'kununu',
    sort: 'relevance',
  };

  const defaultLink = 'www.kununu.com/us/kununu-us/reviews';

  it('should return link without params', () => {
    expect(getUrl(defaultLink, query)).toEqual(defaultLink);
  });

  it('should return link with preview param', () => {
    const customQuery = {...query, preview: 'preview'};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}?preview=preview`);
  });

  it('should not return link with preview param because the value is empty', () => {
    const customQuery = {...query, preview: ''};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}`);
  });

  it('should not return link with preview param because the value is undefined', () => {
    const customQuery = {...query, preview: undefined};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}`);
  });

  it("should return link with x-lang='' param because x-lang accepts empty string", () => {
    const customQuery = {...query, 'x-lang': ''};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}?x-lang=`);
  });

  it('should not return link with x-lang param because the value is undefined', () => {
    const customQuery = {...query, 'x-lang': undefined};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}`);
  });

  it('should return link with preview and x-lang param', () => {
    const customQuery = {...query, preview: 'preview', 'x-lang': 'EN_US'};

    expect(getUrl(defaultLink, customQuery)).toEqual(`${defaultLink}?preview=preview&x-lang=EN_US`);
  });

  it('should return link with preview and other params', () => {
    const customQuery = {...query, preview: 'preview'};
    const otherParams = 'sort=newest';

    expect(getUrl(defaultLink, customQuery, otherParams)).toEqual(`${defaultLink}?preview=preview&sort=newest`);
  });

  it('should return link without preview but with other params', () => {
    const otherParams = 'sort=newest';

    expect(getUrl(defaultLink, query, otherParams)).toEqual(`${defaultLink}?sort=newest`);
  });
});
