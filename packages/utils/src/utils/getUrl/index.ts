const PREVIEW = 'preview';
const XLANG = 'x-lang';

const keepParams = [PREVIEW, XLANG];

const getUrl = (
  link: string,
  query: Record<string, unknown>,
  otherParams = '',
): string => {
  const params = Object.keys(query).reduce((acc, value) => {
    const xlangIsValid =
      value === XLANG && (!!query[value] || query[value] === ''); // the only empty value accept is empty string
    const previewIsValid = value === PREVIEW && !!query[value];

    if (keepParams.includes(value) && (xlangIsValid || previewIsValid)) {
      return `${acc}${acc ? '&' : ''}${value}=${query[value]}`;
    }
    return acc;
  }, '');
  // To make sure that otherParams don't include preview and x-lang value
  const otherParamsParsed = otherParams
    .split('&')
    .filter(param => !keepParams.includes(param.split('=')[0]))
    .join('&');

  if (params && otherParamsParsed) {
    return `${link}?${params}&${otherParamsParsed}`;
  }

  if (params) return `${link}?${params}`;

  if (otherParamsParsed) {
    return `${link}?${otherParamsParsed}`;
  }

  return link;
};

export default getUrl;
