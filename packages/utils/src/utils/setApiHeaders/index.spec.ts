import setApiHeaders, {defaultHeaders} from '.';

describe('setApiHeaders', () => {
  it('should return only the default headers', () => {
    expect(setApiHeaders()).toEqual(defaultHeaders);
  });

  it('should return the default headers + the new headers sent', () => {
    const extraHeaders = {'x-lang': 'en_us'};

    expect(setApiHeaders(extraHeaders)).toEqual({...defaultHeaders, ...extraHeaders});
  });
});
