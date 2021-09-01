import getParsedCookie from '.';

describe('Server', () => {
  describe('utils', () => {
    describe('getParsedCookie', () => {
      const application = 'app-sitemaps';

      it('parses a valid stringified cookie', () => {
        const myCookieData = {
          data: 'stringifiedData',
        };

        const cookies = {
          myCookie: JSON.stringify(myCookieData),
        };

        expect(getParsedCookie(cookies, 'myCookie', application)).toEqual(myCookieData);
      });

      it('returns null, when the cookie does not exist', () => {
        const cookies = {};

        expect(getParsedCookie(cookies, 'myCookie', application)).toEqual(null);
      });

      it('returns null, when the cookie cannot be parsed', () => {
        const cookies = {
          myCookie: 'some { invalid json',
        };

        try {
          expect(getParsedCookie(cookies, 'myCookie', application)).toEqual(null);
        } catch (err) {
          expect(err).not.toBe(undefined);
        }
      });
    });
  });
});
