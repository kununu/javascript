import getLanguage from '.';

const defaultReq = {
  cookies: {},
  headers: {},
  originalUrl: '/at/kununu',
  query: {},
};

const res = {
  cookie: jest.fn(),
  redirect: jest.fn(),
};

describe('Get languages', () => {
  afterEach(() => {
    res.redirect.mockClear();
  });

  describe('URLs don\'t have x-lang query parameter defined', () => {
    it('should return de_DE because url don\'t have country defined', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/',
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should return de_DE because is the current country', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland',
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should return de_DE because AT is the current country', () => {
      expect(getLanguage(defaultReq, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should return de_DE as default because PT isn\'t a valid country', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/pt/kununu',
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should return de_DE because cp it isn\'t a valid country', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/cp',
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should not set cookie value because x-lang query parameter its not defined', () => {
      getLanguage(defaultReq, res);
      expect(res.cookie).not.toHaveBeenCalled();
    });
  });

  describe('URLs have x-lang query parameter defined', () => {
    it('should return en_US because x-lang value is supported', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland?x-lang=en_US',
        query: {
          'x-lang': 'en_US',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use language of URL countryCode, because x-lang don\'t have a valid value and neither cookies or acceptance headers are defined', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/at/kununu?x-lang=',
        query: {
          'x-lang': '',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use language of URL countryCode, because x-lang don\'t have a supported value and neither cookies or acceptance headers are defined', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/at/kununu?x-lang=pt_PT',
        query: {
          'x-lang': '',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use de_DE, because x-lang have DE defined as language', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/at/kununu?x-lang=de',
        query: {
          'x-lang': 'de',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use de_DE, because x-lang have an invalid language defined', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/at/kununu?x-lang=pt',
        query: {
          'x-lang': 'pt',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use de_DE, because x-lang have a german locale', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/at/kununu?x-lang=de_AT',
        query: {
          'x-lang': 'de_AT',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should redirect because the valid x-lang is different from the url x-lang', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland?x-lang=de_AT',
        query: {
          'x-lang': 'de_AT',
        },
      };

      getLanguage(req, res);
      expect(res.redirect).toHaveBeenCalledWith(302, '/de/cgi-deutschland?x-lang=de_DE');
    });

    it('should redirect because x-lang the url x-lang is the short version', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland?x-lang=de',
        query: {
          'x-lang': 'de',
        },
      };

      getLanguage(req, res);
      expect(res.redirect).toHaveBeenCalledWith(302, '/de/cgi-deutschland?x-lang=de_DE');
    });

    it('should not redirect because x-lang the url x-lang is valid', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland?x-lang=de_DE',
        query: {
          'x-lang': 'de_DE',
        },
      };

      getLanguage(req, res);
      expect(res.redirect).not.toHaveBeenCalled();
    });

    it('should set cookie value because URL have x-lang query parameter is defined', () => {
      const req = {
        ...defaultReq,
        originalUrl: '/de/cgi-deutschland?x-lang=en_US',
        query: {
          'x-lang': 'en_US',
        },
      };

      getLanguage(req, res);
      expect(res.cookie).toHaveBeenCalled();
    });
  });

  describe('URLs have x-lang query parameter defined and cookie defined', () => {
    const defaultCookieReq = {
      ...defaultReq,
      originalUrl: '/at/kununu?x-lang=',
      query: {
        'x-lang': '',
      },
    };

    it('should return en_US because url have x-lang defined in cookie', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'en_US',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use en_US, because en is the locale supported for en language', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'en_GB',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use en, because en is the kununu_x_lang value defined', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'en',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use de_DE, because pt is the kununu_x_lang value defined and is not supported', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'pt',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should redirect because the valid x-lang is different from the url x-lang', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'en_GB',
        },
      };

      getLanguage(req, res);
      expect(res.redirect).toHaveBeenCalledWith(302, '/at/kununu?x-lang=en_US');
    });

    it('should set cookie value because URL have x-lang query parameter is defined and cookie is also defined', () => {
      const req = {
        ...defaultCookieReq,
        cookies: {
          kununu_x_lang: 'en_GB',
        },
      };

      getLanguage(req, res);
      expect(res.cookie).toHaveBeenCalled();
    });
  });

  describe('URLs have x-lang query parameter defined and cookie defined and Acceptance header defined', () => {
    const defaultHeaderReq = {
      ...defaultReq,
      cookies: {
        kununu_x_lang: 'pt_PT',
      },
      headers: {
        'accept-language': 'en-US,en;q=0.9,en-GB;q=0.8,pt;q=0.7',
      },
      originalUrl: '/at/kununu?x-lang=',
      query: {
        'x-lang': '',
      },
    };

    it('should use en_US because it\'s defined in the accept language headers', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'en-US,en;q=0.9,en-GB;q=0.8,pt;q=0.7',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use de_DE because de_AT it\'s defined in the accept language headers', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'de-AT,en;q=0.9,De-DE;q=0.8,pt;q=0.7',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use en_US because en-GB it\'s defined in the accept Language headers', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'en-GB',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use de_DE because pt_PT it\'s not supported', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'pt-PT',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use en_US because en it\'s defined in the accept Language headers', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'pt-PT,  en;q=0.5',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'en-US', language: 'en', locale: 'en_US'});
    });

    it('should use de_DE because * it\'s defined in the accept Language headers and we fallback to countryCode in URL', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'pt-PT,  *;q=0.5',
        },
        originalUrl: '?x-lang=',
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use de_DE because nothing is defined in the accept Language headers is supported', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'pt-PT,fr-CA',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should use de_DE because nothing is support in Accept header and it contains a script', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'zh-Hant-cn;q=1, zh-cn;q=0.6, zh;q=0.4',
        },
      };

      expect(getLanguage(req, res)).toEqual({hrefLang: 'de-DE', language: 'de', locale: 'de_DE'});
    });

    it('should redirect because the valid x-lang is different from the url x-lang', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'en-GB',
        },
      };

      getLanguage(req, res);
      expect(res.redirect).toHaveBeenCalledWith(302, '/at/kununu?x-lang=en_US');
    });

    it('should set cookie value because URL have x-lang query parameter is defined and cookie is defined and Acceptance header is also defined', () => {
      const req = {
        ...defaultHeaderReq,
        headers: {
          'accept-language': 'zh-Hant-cn;q=1, zh-cn;q=0.6, zh;q=0.4',
        },
      };

      getLanguage(req, res);
      expect(res.cookie).toHaveBeenCalled();
    });
  });
});
