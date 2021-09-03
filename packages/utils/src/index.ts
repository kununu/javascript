import getUrl from './utils/getUrl';
import httpHeaderFilter from './utils/httpHeaderFilter';
import isClientRender from './utils/isClientRender';
import buildHTTPHeaders from './utils/buildHTTPHeaders';
import setApiHeaders from './utils/setApiHeaders';
import getProfileLink from './utils/getProfileLink';
import setCookieLanguage from './utils/setCookieLanguage';
import isLoggedIn from './utils/isLoggedIn';
import getParsedCookie from './utils/getParsedCookie';
import getLanguage from './utils/languages';
import fetchApi from './utils/api';
import fetchApiDomain, {getBFFURL} from './utils/fetchApiDomain';
import {
  getCountriesByLocale,
  getCountryByLocale,
  isDach,
  isUSLocale,
} from './utils/countries';

export {
  buildHTTPHeaders,
  fetchApi,
  fetchApiDomain,
  getBFFURL,
  getCountriesByLocale,
  getCountryByLocale,
  getLanguage,
  getParsedCookie,
  getProfileLink,
  getUrl,
  httpHeaderFilter,
  isClientRender,
  isDach,
  isLoggedIn,
  isUSLocale,
  setApiHeaders,
  setCookieLanguage,
};
