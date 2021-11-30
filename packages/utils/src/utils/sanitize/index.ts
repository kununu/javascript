import sanitizeHtml from 'sanitize-html';

import {DEFAULT_ALLOWED_TAGS} from '../../constants/sanitize';
import {sanitizeOptions, defaultSanitizeOptions} from '../../typings/sanitize';

const defaultOptions: defaultSanitizeOptions = {
  allowedTags: DEFAULT_ALLOWED_TAGS,
};

const sanitize = (html: string, options: sanitizeOptions = defaultOptions): string => {
  const {
    allowedAttributes = {},
    allowedTags = DEFAULT_ALLOWED_TAGS,
    skipHtmlEntities = false,
  } = options;

  return sanitizeHtml(
    html,
    {
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        ...allowedAttributes,
      },
      allowedTags,
      ...(skipHtmlEntities ? {textFilter: (text: string) => text.replace(/&amp;/g, '&')} : {}),
    },
  );
};

export default sanitize;
