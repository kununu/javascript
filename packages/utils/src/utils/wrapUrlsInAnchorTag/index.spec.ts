import wrapUrlsInAnchorTag from '.';

fdescribe('statements', () => {
  describe('utils', () => {
    describe('wrapUrlsInAnchorTag', () => {
      it.each([
        {
          expected: 'Some text <a href="http://url.com" target="_blank" rel="noopener noreferrer">http://url.com</a>',
          sentence: 'Some text http://url.com',
        },
        {
          expected: '<a href="https://google.com" target="_blank" rel="noopener noreferrer">https://google.com</a> Text at the end',
          sentence: 'https://google.com Text at the end',
        },
        {
          expected:
          'Text at the beginning ' +
          '<a href="https://link.at.the.middle" target="_blank" rel="noopener noreferrer">https://link.at.the.middle</a> ' +
          'with more text at the end',
          sentence: 'Text at the beginning https://link.at.the.middle with more text at the end',
        },
        {
          expected:
          '<a href="https://google.com" target="_blank" rel="noopener noreferrer">https://google.com</a> ' +
          '<a href="http://url.com" target="_blank" rel="noopener noreferrer">http://url.com</a> ' +
          'Yo, now two urls',
          sentence: 'https://google.com http://url.com Yo, now two urls',
        },
        {
          expected:
          '<a href="https://news.kununu.com/test/link-with-slash" target="_blank" rel="noopener noreferrer">' +
          'https://news.kununu.com/test/link-with-slash</a> link with slash',
          sentence: 'https://news.kununu.com/test/link-with-slash link with slash',
        },
      ])('add anchor tag correctly', ({expected, sentence}) => {
        const wrappedText = wrapUrlsInAnchorTag(sentence);

        expect(wrappedText).toBe(expected);
      });

      it('does not break if no match is found', () => {
        const sentence = 'Lorem Ipsum';
        const wrappedText = wrapUrlsInAnchorTag(sentence);

        expect(wrappedText).toBe(sentence);
      });
    });
  });
});
