const URL_REGEX = /https?:\/\/[^\s|<]+/g;

/**
 * @param {string} url
 * @returns {string}
 */
function buildAnchorTag (url: string): string {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
}

/**
 * Wraps a URL in a `<a /> tag`
 *
 * @param {string} text
 * @returns {string}
 */
function wrapUrlsInAnchorTag (text: string): string {
  const matches = text.match(URL_REGEX);
  let replacedText = text;

  matches?.forEach(match => {
    replacedText = replacedText.replace(match, buildAnchorTag(match));
  });

  return replacedText;
}

export default wrapUrlsInAnchorTag;
