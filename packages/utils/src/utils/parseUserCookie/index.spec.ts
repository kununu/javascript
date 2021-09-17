import jwtDecode from 'jwt-decode';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';

import {
  buildHTTPHeaders,
  getParsedCookie,
  isLoggedIn,
} from '../..';

import parseUserCookie from '.';

jest.mock('@kununu/redux/dist/actions/user');
jest.mock('@kununu/kununu-utils/dist/kununu-logger');
jest.mock('jwt-decode');
jest.mock('../..');

(jwtDecode as any).mockImplementation(() => ({
  custom: {
    user_uuid: '3',
  },
  scopes: [],
}));
(buildHTTPHeaders as any).mockImplementation(() => ({
  headerName: 'headerValue',
}));

const config = {
  accessTokenCookie: 'accessTokenCookie',
  application: 'application',
  userLoggedInfoCookie: 'userLoggedInfoCookie',
};
const dispatch = jest.fn();
const fetchUserInfo = jest.fn();
const setUserLoggedInfo = jest.fn();
const setUserLoggedStatus = jest.fn();
const defaultReq = {
  cookies: {},
  headers: {},
};

describe('parseUserCookie', () => {
  beforeEach(() => {
    setUserLoggedStatus.mockClear();
    fetchUserInfo.mockClear();
  });

  it('should return undefined because token is not valid', () => {
    (getParsedCookie as any).mockImplementation(() => false);
    const result = parseUserCookie(defaultReq, dispatch, config, fetchUserInfo, setUserLoggedInfo, setUserLoggedStatus);

    expect(result).toBeFalsy();
  });

  it('should call setUserLoggedStatus and fetchUserInfo', () => {
    (getParsedCookie as any).mockImplementation(() => ({accessToken: 'kununu_access_token_v1'}));
    (isLoggedIn as any).mockImplementation(() => (true));
    parseUserCookie(defaultReq, dispatch, config, fetchUserInfo, setUserLoggedInfo, setUserLoggedStatus);

    expect(setUserLoggedStatus).toHaveBeenCalledWith(true);
    expect(setUserLoggedInfo).toHaveBeenCalledWith({accessToken: 'kununu_access_token_v1'});
    expect(fetchUserInfo).toHaveBeenCalledWith('3', {headerName: 'headerValue'});
  });

  it('should call fetchUserInfo with cokkie in the header', () => {
    (getParsedCookie as any).mockImplementation(() => ({accessToken: 'kununu_access_token_v1'}));
    (isLoggedIn as any).mockImplementation(() => (true));
    const req = {
      ...defaultReq,
      headers: {
        cookie: 'myCookie',
      },
    };

    parseUserCookie(req, dispatch, config, fetchUserInfo, setUserLoggedInfo, setUserLoggedStatus);

    expect(buildHTTPHeaders).toHaveBeenCalledWith(req, {Cookie: req.headers.cookie});
  });

  it('should not call fetchUserInfo because user is not logged in', () => {
    (getParsedCookie as any).mockImplementation(() => ({accessToken: 'kununu_access_token_v1'}));
    (isLoggedIn as any).mockImplementation(() => (false));
    parseUserCookie(defaultReq, dispatch, config, fetchUserInfo, setUserLoggedInfo, setUserLoggedStatus);

    expect(setUserLoggedStatus).toHaveBeenCalledWith(false);
    expect(fetchUserInfo).not.toHaveBeenCalled();
  });

  it('should call logger.error', () => {
    (getParsedCookie as any).mockImplementation(() => ({}));
    (isLoggedIn as any).mockImplementation(() => (true));
    parseUserCookie({cookies: 'cookie'}, dispatch, config, fetchUserInfo, setUserLoggedInfo, setUserLoggedStatus);

    expect(logger.error).toHaveBeenCalled();
  });
});
