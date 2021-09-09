import fetchMock from 'fetch-mock';
import * as kununuSessionCallback from '@kununu/kununu-utils/dist/kununu-helpers/kununuSession';

import {fetchApiDomain, getBFFURL} from '../..';

import fetchApi from '.';

jest.spyOn(kununuSessionCallback, 'default').mockImplementation(() => ({
  default: jest.fn(),
}));

describe('api', () => {
  it('returns the result of a fetch if successful', async () => {
    const endpoint = '/success';
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}`;
    const body = {message: 'success'};

    fetchMock.once(url, {
      body,
    });

    const result = await fetchApi(endpoint)();

    expect(result).toEqual(body);
  });

  it('calls kununuSession before a request', async () => {
    const endpoint = '/success-session';
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}`;
    const body = {message: 'success'};

    fetchMock.once(url, {
      body,
    });

    await fetchApi(endpoint)();

    expect(kununuSessionCallback.default).toHaveBeenCalled();
  });

  it('throws an error for status codes it cannot handle', async () => {
    const endpoint = '/failure';
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}`;
    const status = 503;
    const body = {message: 'failure'};

    fetchMock.once(url, {
      body,
      ok: false,
      status,
    });

    try {
      await fetchApi(endpoint)();
    } catch (err) {
      expect(err.status).toEqual(status);
      expect(JSON.parse(err.response.body)).toEqual(body);
    }
  });

  it('returns request time out if request takes too long', async () => {
    const endpoint = '/timeout';
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}`;

    fetchMock.once(
      url,
      () => new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 200);
      }),
    );

    try {
      await fetchApi(endpoint, {}, {}, 100)();
    } catch (err) {
      expect(err.status).toEqual(408);
    }
  });

  it('handles query params correctly', async () => {
    const endpoint = '/queryparams';
    const body = {message: 'some param was set'};
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}?someparam=set`;

    fetchMock.once(url, {
      body,
    });

    const result = await fetchApi(endpoint, {someparam: 'set'})();

    expect(result).toEqual(body);
  });
});
