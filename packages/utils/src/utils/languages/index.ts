import setCookieLanguage from '../setCookieLanguage';

type ReqProp = {
  query: Record<string, string>,
  originalUrl: string,
  cookies: Record<string, string>,
  headers: Record<string, string>,
};

const languages = {
  de: {
    countries: ['at', 'ch', 'de'],
    default: 'de_DE',
  },
  en: {
    countries: ['us'],
    default: 'en_US',
  },
};
const supportedLanguageCodes = Object.keys(languages);
const defaultLocale = languages.de.default;

// https://github.com/opentable/accept-language-parser
const parseAcceptLanguage = (al: string) => al.replace(/ /g, '').split(',').map(m => {
  const bits = m.split(';');
  const ietf = bits[0].split('-');
  const hasScript = ietf.length === 3;

  return {
    code: ietf[0],
    quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
    region: hasScript ? ietf[2] : ietf[1],
    script: hasScript ? ietf[1] : null,
  };
}).sort((a, b) => b.quality - a.quality);

const getLocaleByUrl = originalUrl => {
  const match = originalUrl.match(/^\/(?<countryCode>[a-z]{2})(\/|$)/);
  const countryCode = match && match.groups ? match.groups.countryCode : undefined;

  // case if url don't have a countryCode
  if (!countryCode) return defaultLocale;
  const countryIsLanguage = supportedLanguageCodes.includes(countryCode);

  // case if countryCode is a supported language
  if (countryIsLanguage) return languages[countryCode].default;

  const language = supportedLanguageCodes.find(lang => languages[lang].countries.includes(countryCode));

  // case if countryCode is supported  by a language
  if (language) return languages[language].default;

  // default to german
  return defaultLocale;
};

const setLanguageObj = (locale: string, req: ReqProp, res?: any): Record<string, string> => {
  const {'x-lang': xLangQuery} = req.query;

  if (res) setCookieLanguage(locale, res);

  const response = {
    hrefLang: locale.replace('_', '-'),
    language: locale.split('_')[0],
    locale,
  };

  if (typeof xLangQuery !== 'undefined' && response.locale !== xLangQuery) res.redirect(302, req.originalUrl.replace(/x-lang.*?(?=(?:&|$))/, `x-lang=${response.locale}`));

  return response;
};

const handleXLang = (xLangQuery: string, req: ReqProp, res: unknown) => {
  // To prevent the case where the user defined the x-lang in the URL, but didn't pass any value
  if (xLangQuery) {
    const languageInXlang = xLangQuery.split('_')[0];

    if (supportedLanguageCodes.includes(languageInXlang)) return setLanguageObj(languages[languageInXlang].default, req, res);
  }
  return null;
};

const handleAcceptLanguage = (acceptLanguage: string, req: ReqProp, res: unknown, localeInURL: string) => {
  if (acceptLanguage) {
    const languageSupported = parseAcceptLanguage(acceptLanguage)
      .find(al => supportedLanguageCodes.includes(al.code) || al.code === '*' || supportedLanguageCodes.includes(al.code.split('-')[0]));

    const {code} = languageSupported || {};
    const acceptAll = code === '*';

    if (!code || acceptAll) return setLanguageObj(localeInURL, req, res);

    return setLanguageObj(languages[code].default, req, res);
  }
  return null;
};

const getLanguage = (req: ReqProp, res: unknown): unknown => {
  const {'x-lang': xLangQuery} = req.query;
  const {kununu_x_lang: xLangCookie} = req.cookies;
  const {'accept-language': acceptLanguage} = req.headers;

  const localeInURL = getLocaleByUrl(req.originalUrl);

  // because ?x-lang and ?x-lang= are valid cases
  if (typeof xLangQuery === 'undefined') return setLanguageObj(localeInURL, req); // don't pass res here, because we don't want to set the cookie

  return handleXLang(xLangQuery, req, res) ||
    handleXLang(xLangCookie, req, res) ||
    handleAcceptLanguage(acceptLanguage, req, res, localeInURL) ||
    setLanguageObj(localeInURL, req, res);
};

export default getLanguage;
