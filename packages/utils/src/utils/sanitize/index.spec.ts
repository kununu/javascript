import sanitizeHtml from 'sanitize-html';

import sanitize from '.';

jest.mock('sanitize-html');

const mockSanitizeHtml = jest.fn();

sanitizeHtml.mockImplementation(mockSanitizeHtml);

describe('sanitizeHtml', () => {
  it('should call sanitizeHtml with provided html', () => {
    sanitize('<b>my label</b>', {});

    expect(mockSanitizeHtml).toHaveBeenCalledWith('<b>my label</b>', expect.any(Object));
  });

  it('should call sanitizeHtml with provided allowed tags and attributes', () => {
    sanitize(
      '<b>my label</b>',
      {
        allowedAttributes: {
          a: ['href'],
          img: ['src'],
        },
        allowedTags: ['b', 'a'],
      },
    );

    expect(mockSanitizeHtml).toHaveBeenCalledWith(
      expect.any(String),
      {
        allowedAttributes: {
          a: ['href'],
          img: ['src'],
        },
        allowedTags: ['b', 'a'],
      },
    );
  });

  it('should have no textFilter if skipHtmlEntities is false', () => {
    sanitize('<b>my label</b>', {skipHtmlEntities: false});

    expect(mockSanitizeHtml).toHaveBeenCalledWith(
      '<b>my label</b>',
      {
        allowedAttributes: expect.any(Object),
        allowedTags: expect.any(Array),
      },
    );
  });

  it('should have textFilter if skipHtmlEntities is true', () => {
    sanitize('<b>my label</b>', {skipHtmlEntities: true});

    expect(mockSanitizeHtml).toHaveBeenCalledWith(
      '<b>my label</b>',
      {
        allowedAttributes: expect.any(Object),
        allowedTags: expect.any(Array),
        textFilter: expect.any(Function),
      },
    );
  });

  it('should replace &amp; with & if skipHtmlEntities is true', () => {
    mockSanitizeHtml.mockImplementation(
      (html, options) => options.textFilter(html),
    );

    const result = sanitize('xing &amp; kununu', {skipHtmlEntities: true});

    expect(result).toEqual('xing & kununu');
  });
});
