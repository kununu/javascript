const allowedHeaders = [
  'x-amzn-trace-id',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-forwarded-port',
  'x-forwarded-proto',
  'x-forwarded-server',
  'user-agent',
  'referer',
  'origin',
  'X-Lang',
];

const httpHeaderFilter = (
  headers: Record<string, string>,
  additionalAllowed = [],
): Record<string, string> => Object.keys(headers)
  .filter(key => allowedHeaders.concat(additionalAllowed).includes(key))
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: headers[key],
    }),
    {},
  );

export default httpHeaderFilter;
