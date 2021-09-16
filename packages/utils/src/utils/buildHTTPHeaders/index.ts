import httpHeaderFilter from '../httpHeaderFilter';

/**
 * Builds the headers with only the valid ones and
 * adds the x-lang header in case there is a locale defined
 *
 * @param {Array} params
 * @param {number} timeout
 */
const buildHTTPHeaders = (
  req?: Record<string, any>,
  additionalHeaders = {},
): Record<string, string> => {
  const headers = {
    ...req?.headers,
    ...additionalHeaders,
  };

  if (req?.locale) {
    headers['X-Lang'] = req.locale;
  }
  return httpHeaderFilter(headers, Object.keys(additionalHeaders));
};

export default buildHTTPHeaders;
