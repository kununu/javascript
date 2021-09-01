import cookies from '@kununu/kununu-utils/dist/kununu-helpers/cookies';

import setCookieLanguage from '.';

cookies.set = jest.fn();

describe('setCookieLanguage', () => {
  it('call res.cookie', () => {
    const res = {cookie: jest.fn()};

    setCookieLanguage('en_US', res);
    expect(res.cookie).toHaveBeenCalledWith('kununu_x_lang', 'en_US', {maxAge: 604800, path: '/'});
  });

  it('call kununu utils set', () => {
    setCookieLanguage('en_US');
    expect(cookies.set).toHaveBeenCalledWith('kununu_x_lang', 'en_US', {maxAge: 604800, path: '/'});
  });
});
