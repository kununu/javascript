import jwtDecode from 'jwt-decode';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';
import {
  fetchUserInfo,
  setUserLoggedInfo,
  setUserLoggedStatus,
} from '@kununu/redux/dist/actions/user';

import {
  buildHTTPHeaders,
  getParsedCookie,
  isLoggedIn,
} from '../..';

/**
 * Parses the user token, sets the user login state and updates relevant user info
 *
 * @param {Object} req
 * @param {Object} req.cookies
 * @param {function} dispatch
 */
export default function parseUserCookie (req:Record<string, any>, dispatch:any, config:any): Promise<unknown> {
  const {application, accessTokenCookie, userLoggedInfoCookie} = config;
  const token = getParsedCookie(req.cookies, accessTokenCookie, application);

  const userLoggedInfo = getParsedCookie(
    req.cookies,
    userLoggedInfoCookie,
    application,
  );

  if (!token) return;

  try {
    const decodedToken = jwtDecode(token.accessToken);
    const userIsLoggedIn = isLoggedIn((decodedToken as any).scopes);

    dispatch(setUserLoggedStatus(userIsLoggedIn));
    if (userLoggedInfo) dispatch(setUserLoggedInfo(userLoggedInfo));
    if (userIsLoggedIn) {
      dispatch(
        fetchUserInfo(
          (decodedToken as any).custom.user_uuid,
          buildHTTPHeaders(
            req,
            req.headers.cookie ? {Cookie: req.headers.cookie} : {},
          ),
        ),
      );
    }
  } catch (exception) {
    logger.error({
      application,
      context: {exception},
      message: `Caught error while setting user ID: ${token.accessToken}`,
    });
  }
}
