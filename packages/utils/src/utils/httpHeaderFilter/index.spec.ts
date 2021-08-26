
import httpHeaderFilter from '.';

describe('httpHeaderFilter', () => {
  const headers = {
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7',
    host: 'www-local.dev.kununu.it',
    'if-none-match': '"1356a-OJvJVy+YANooKfI0dxSZMg0oCHI"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'x-forwarded-for': '10.42.0.1',
    'x-forwarded-host': 'www-local.dev.kununu.it',
    'x-forwarded-port': '443',
    'x-forwarded-proto': 'https',
    'x-forwarded-server': 'traefik-56b8f85885-hmcvj',
    'X-Lang': 'de_DE',
    'x-new-profiles': '1',
    'x-real-ip': '10.42.0.1',
  };

  const filteredHeaders = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'x-forwarded-for': '10.42.0.1',
    'x-forwarded-host': 'www-local.dev.kununu.it',
    'x-forwarded-port': '443',
    'x-forwarded-proto': 'https',
    'x-forwarded-server': 'traefik-56b8f85885-hmcvj',
    'X-Lang': 'de_DE',
  };

  it('should return the headers filtered', () => {
    expect(httpHeaderFilter(headers)).toEqual(filteredHeaders);
  });

  it('should return the headers filtered with the additional allowed headers', () => {
    const additionalAllowed = ['x-new-profiles'];

    expect(httpHeaderFilter(headers, additionalAllowed)).toEqual({...filteredHeaders, 'x-new-profiles': '1'});
  });
});
