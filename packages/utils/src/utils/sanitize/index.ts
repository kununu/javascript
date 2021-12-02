import sanitizeHtml from 'sanitize-html';

import {DEFAULT_ALLOWED_TAGS} from '../../constants/sanitize';
import {SanitizeOptions, DefaultSanitizeOptions} from '../../typings/sanitize';

const defaultOptions: DefaultSanitizeOptions = {
  allowedTags: DEFAULT_ALLOWED_TAGS,
};

const sanitize = (html: string, options: SanitizeOptions = defaultOptions): string => {
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
