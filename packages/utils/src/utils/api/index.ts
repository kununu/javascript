import getConfig from 'next/config';
import httpStatus from 'http-status-codes';
import 'isomorphic-fetch';
import qs from 'qs';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';
import apiErrorLogger from '@kununu/kununu-utils/dist/kununu-helpers/apiErrorLogger';
import checkKununuSession from '@kununu/kununu-utils/dist/kununu-helpers/kununuSession';

import {fetchApiDomain, getBFFURL, setApiHeaders} from '../..';

const {
  publicRuntimeConfig: {
    server: {name: application},
  },
} = getConfig();

const HTTP_SUCCESS_CODES = [
  httpStatus.OK,
  httpStatus.CREATED,
  httpStatus.ACCEPTED,
  httpStatus.NO_CONTENT,
  httpStatus.RESET_CONTENT,
  httpStatus.PARTIAL_CONTENT,
  httpStatus.NOT_MODIFIED,
  httpStatus.BAD_REQUEST,
];

function verifyHttpStatus (response) {
  if (HTTP_SUCCESS_CODES.includes(response.status)) {
    return response;
  }

  // TODO: remove eslint-disable-line with better implementation
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    response,
    status: response.status,
    statusText: response.statusText,
  });
}

/**
 * Executes a fetch request but also makes sure,
 * that response doesn't take too long
 *
 * @param {Object} params
 * @param {number} timeout
 */
function fetchOrTimeout (params: [string, Record<string, unknown>], timeout: number) {
  const [url, req] = params;

  return new Promise((resolve, reject) => {
    const message = `Request timed out: ${url}`;
    const isServerRender = typeof window === 'undefined';

    const timeoutId = setTimeout(() => {
      if (isServerRender) {
        logger.error({
          application,
          message,
          req,
        });
      }

      // TODO: remove eslint-disable-line with better implementation
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        // Set status so that our error module shows the message
        // below instead of a generic error message.
        message,
        status: httpStatus.GATEWAY_TIMEOUT, // According to RFC 2068, this case should be a 504 instead of a 408 error
      });
    }, timeout || 30000);

    fetch(...params)
      .then(
        res => {
          if (!res.ok) {
            throw res;
          }

          return res;
        },
      )
      .then(
        res => {
          if (isServerRender) {
            logger.info({
              application,
              message: `Received success message from ${url}`,
              req,
            });
          }

          clearTimeout(timeoutId);
          resolve(res);
        },
      ).catch(
        reason => {
          if (isServerRender) {
            logger.error({
              application,
              message: `Received error response from ${url}`,
              req,
            });
          }

          clearTimeout(timeoutId);
          resolve(reason);
        },
      );
  });
}

/**
 * Wrapper to handle fetch requests and resolve the result
 *
 * @param {Object} request
 * @param {string} request.url
 * @param {Object} request.params
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
        ...params,
        body: JSON.stringify(params.body),
        credentials: 'include',
        headers: setApiHeaders(params.headers),
      },
    ],
    timeout,
  )
    .then(verifyHttpStatus)
    .then(response => response.json())
    .catch(exception => {
      if (typeof apiErrorLogger === 'function' && exception.response) {
        apiErrorLogger(exception, application);
      }

      return Promise.reject(exception);
    });
}

/**
 * Unified api fetch for calls to bff
 * @param {string} endpoint
 * @param {Object} query
 * @param {Object} params
 * @param {number} timeout
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

    // We cant and should not use PUBLIC_FQDN - wont work in preview envs, and requests would go
    const queryString = qs.stringify(query || {}, {arrayFormat: 'brackets'});

    const url = `${fetchApiDomain()}${getBFFURL(endpoint)}${queryString ? `?${queryString}` : ''
    }`;

    if (typeof window === 'undefined') {
      logger.info({
        application,
        message: `Created request to ${url}`,
        req: params,
      });
    }

    return handleRequest({params, url}, timeout);
  };
}
