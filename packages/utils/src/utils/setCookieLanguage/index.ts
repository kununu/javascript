import cookies from '@kununu/kununu-utils/dist/kununu-helpers/cookies';

const ONE_WEEK_IN_MILLISECONDS = 60 * 60 * 24 * 7;

const cookieOptions = {
  maxAge: ONE_WEEK_IN_MILLISECONDS,
  path: '/',
};

const cookieName = 'kununu_x_lang';

const setCookieLanguage = (value: string, res?: Record<string, any>): void => {
  if (res && res.cookie) {
    res.cookie(cookieName, value, cookieOptions);
  } else {
    cookies.set(cookieName, value, cookieOptions);
  }
};

export default setCookieLanguage;
