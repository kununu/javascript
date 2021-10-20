import sanitizeHtml from 'sanitize-html';

import {DEFAULT_ALLOWED_TAGS} from '../../constants/sanitize';
import {sanitizeOptions} from '../../typings/sanitize';

const sanitize = (html: string, options: sanitizeOptions): string => {
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
