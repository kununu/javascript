import wrapUrlsInAnchorTag from '.';

describe('statements', () => {
  describe('utils', () => {
    describe('wrapUrlsInAnchorTag', () => {
      it.each([
        {
          expectedToContain: ['<a href="http://url.com" target="_blank" rel="noopener noreferrer">http://url.com</a>'],
          sentence: 'Some text http://url.com',
        },
        {
          expectedToContain: ['<a href="https://google.com" target="_blank" rel="noopener noreferrer">https://google.com</a>'],
          sentence: 'https://google.com Text at the end',
        },
        {
          expectedToContain: ['<a href="https://link.at.the.middle" target="_blank" rel="noopener noreferrer">https://link.at.the.middle</a>'],
          sentence: 'Text at the beginning https://link.at.the.middle with more text at the end',
        },
        {
          expectedToContain: [
            '<a href="https://google.com" target="_blank" rel="noopener noreferrer">https://google.com</a>',
            '<a href="http://url.com" target="_blank" rel="noopener noreferrer">http://url.com</a>',
          ],
          sentence: 'https://google.com http://url.com Yo, now two urls',
        },
        {
          expectedToContain: [
            '<a href="https://news.kununu.com/test/link-with-slash" target="_blank" rel="noopener noreferrer">https://news.kununu.com/test/link-with-slash</a>',
          ],
          sentence: 'https://news.kununu.com/test/link-with-slash link with slash',
        },
      ])('add anchor tag correctly', ({expectedToContain, sentence}) => {
        const wrappedText = wrapUrlsInAnchorTag(sentence);

        expectedToContain.forEach(expected => {
          expect(wrappedText).toContain(expected);
        });
      });

      it('does not break if no match is found', () => {
        const sentence = 'Lorem Ipsum';
        const wrappedText = wrapUrlsInAnchorTag(sentence);

        expect(wrappedText).toEqual(sentence);
      });
    });
  });
});
