import getUrl from './utils/getUrl';
import httpHeaderFilter from './utils/httpHeaderFilter';
import isClientRender from './utils/isClientRender';
import buildHTTPHeaders from './utils/buildHTTPHeaders';
import setApiHeaders from './utils/setApiHeaders';
import getProfileLink from './utils/getProfileLink';
import setCookieLanguage from './utils/setCookieLanguage';
import isLoggedIn from './utils/isLoggedIn';
import {
  clientSideGetTranslations,
  getLanguage,
  serverSideGetTranslations,
} from './utils/languages';
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
  clientSideGetTranslations,
  fetchApi,
  fetchApiDomain,
  getBFFURL,
  getCountriesByLocale,
  getCountryByLocale,
  getLanguage,
  getProfileLink,
  getUrl,
  httpHeaderFilter,
  isClientRender,
  isDach,
  isLoggedIn,
  isUSLocale,
  serverSideGetTranslations,
  setApiHeaders,
  setCookieLanguage,
};
