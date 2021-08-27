import buildHTTPHeaders from '.';

describe('buildHTTPHeaders', () => {
  const defaultReq = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-forwarded-for': 'client, proxy1, proxy2',
    },
  };
  const defaultExpectedResponse = {
    'x-forwarded-for': 'client, proxy1, proxy2',
  };

  it("Shouldn't add X-Lang header because req isn't defined", () => {
    expect(buildHTTPHeaders()).toEqual({});
  });

  it("Shouldn't add X-Lang header because locale isn't defined", () => {
    expect(buildHTTPHeaders(defaultReq)).toEqual(defaultExpectedResponse);
  });

  it('Should add additional Headers', () => {
    const additionalHeaders = {
      Cookie: 'some cookie',
    };

    const expectedResponse = {
      ...defaultExpectedResponse,
      ...additionalHeaders,
    };

    expect(buildHTTPHeaders(defaultReq, expectedResponse)).toEqual(expectedResponse);
  });

  it("Should add X-Lang header because locale it's defined", () => {
    const req = {
      ...defaultReq,
      locale: 'en_US',
    };
    const expectedResponse = {
      ...defaultExpectedResponse,
      'X-Lang': req.locale,
    };

    expect(buildHTTPHeaders(req)).toEqual(expectedResponse);
  });
});
