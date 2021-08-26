import httpHeaderFilter from '../httpHeaderFilter';

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
