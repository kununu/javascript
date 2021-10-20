import sanitizeHtml from 'sanitize-html';

import {sanitizeOptions} from './typings';

// Extracted from https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
// Added some more and removed insecure ones, like iframe
const DEFAULT_ALLOWED_TAGS: string[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'p',
  'a',
  'ul',
  'ol',
  'li',
  'b',
  'i',
  'strong',
  'em',
  'strike',
  'abbr',
  'code',
  'hr',
  'br',
  'div',
  'table',
  'thead',
  'caption',
  'tbody',
  'tr',
  'th',
  'td',
  'pre',
  'img',
  'noscript',
];

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
