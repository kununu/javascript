/* eslint-disable prefer-promise-reject-errors */
import 'isomorphic-fetch';
import qs from 'qs';
import httpStatus from 'http-status-codes';
import checkKununuSession from '@kununu/kununu-utils/dist/kununu-helpers/kununuSession';

import {fetchApiDomain, getBFFURL, setApiHeaders} from '../..';

const HTTP_SUCCESS_CODES = [
  httpStatus.OK,
  httpStatus.CREATED,
  httpStatus.ACCEPTED,
  httpStatus.NO_CONTENT,
  httpStatus.RESET_CONTENT,
  httpStatus.PARTIAL_CONTENT,
  httpStatus.NOT_MODIFIED,
];

/**
 * Checks if the response's status is a success code
 *
 * @param {Object} response
 */
function verifyHttpStatus (response) {
  if (HTTP_SUCCESS_CODES.includes(response.status)) {
    return response;
  }

  return Promise.reject({
    //eslint-disable-line
    response: response.json(),
    status: response.status,
    statusText: response.statusText,
  });
}

/**
 * Executes a fetch request but also makes sure,
 * that response doesn't take too long
 *
 * @param {Array} params
 * @param {number} timeout
 */
function fetchOrTimeout (params: [string, Record<string, unknown>], timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject({
          //eslint-disable-line
        // Set status so that our error module shows the message
        // below instead of a generic error message.
        message: 'Request timed out, please try again.',
        status: httpStatus.REQUEST_TIMEOUT,
      }),
      timeout,
    );

    fetch(...params).then(resolve, reject);
  });
}

/**
 * Wrapper to handle fetch requests and resolve the result
 *
 * @param {string} url
 * @param {Object} params
 * @param {number} timeout
 */
function handleRequest ({url, params}, timeout) {
  return fetchOrTimeout(
    [
      url,
      {
        /*
      Fetch doesnt include Cookies in any method other than GET automatically
      with credentials:include it does - this is especially needed for POST with Token:
      https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
    */
        body: JSON.stringify(params.body),
        credentials: 'include',
        ...params,
        headers: setApiHeaders(params.headers),
      },
    ],
    timeout,
  )
    .then(verifyHttpStatus)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}

/**
 * Unified api fetch for calls to bff
 * @param {string} endpoint
 * @param {Object} query
 * @param {Object} params
 * @param {number} timeout
 * @param {boolean} isToCheckKununuSession
 */
export default function fetchApi (
  endpoint: string,
  query = {},
  params = {},
  timeout = 30000,
  isToCheckKununuSession = true,
) {
  return (): Promise<unknown> => {
    if (isToCheckKununuSession) {
      checkKununuSession({
        fetchApiFunc: fetchApi,
        shouldPublishLoggedInEvent: true,
      });
    }

    // We cant and shouldnt use PUBLIC_FQDN - wont work in preview envs, and requests would go
    // through our load balancers, node-fetch (server) cant use relative paths
    const queryString = qs.stringify(query, {arrayFormat: 'bracket'});
    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}${
      queryString ? `?${queryString}` : ''
    }`;

    return handleRequest({params, url}, timeout);
  };
}
