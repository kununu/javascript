import {fetchApi, isClientRender} from '@kununu/utils/dist';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';

interface Query {
  [key: string]: string;
}

export const REQUEST_SEARCH_PROFILES = 'REQUEST_SEARCH_PROFILES';
export const SUCCESS_SEARCH_PROFILES = 'SUCCESS_SEARCH_PROFILES';
export const FAILURE_SEARCH_PROFILES = 'FAILURE_SEARCH_PROFILES';

/**
 * Search company profile in BFF
 */
function requestSearchProfiles () {
  return dispatch => {
    dispatch({type: REQUEST_SEARCH_PROFILES});
  };
}

/**
 * Normalizes the dispatch type, when searching company profiles was successful
 *
 * @param {Object} data
 * @return {Object}
 */
function successSearchProfiles (data) {
  return dispatch => {
    dispatch({
      data,
      type: SUCCESS_SEARCH_PROFILES,
    });
  };
}

/**
 * Normalizes the dispatch type, when searching company profiles was unsuccessful
 *
 * @param {Object} data
 * @return {Object}
 */
function failureSearchProfiles (err) {
  return dispatch => {
    dispatch({
      err,
      type: FAILURE_SEARCH_PROFILES,
    });
  };
}

/**
 * Searches for company profiles in BFF
 *
 * @param {object} query Parameters for search query
 * @param {string} query.q A company profile name
 * @param {string} query.countryCode A company profile country code
 * @return {Function} redux dispatch
 */
export function fetchSearchProfiles (
  application: string,
  query: Query,
): (dispatch) => Promise<unknown> {
  return dispatch => {
    dispatch(requestSearchProfiles());
    return fetchApi('/search/profiles', query, {credentials: 'same-origin'})()
      .then(res => dispatch(successSearchProfiles(res)))
      .catch(exception => {
        if (!isClientRender()) {
          logger.error({
            application,
            context: {exception},
            message: `Failure while searching a company profile: ${JSON.stringify(
              {query},
            )}`,
          });
        }

        dispatch(failureSearchProfiles(exception));
      });
  };
}
