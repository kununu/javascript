import {fetchApi} from '@kununu/utils';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_LOGGED_INFO = 'SET_USER_LOGGED_INFO';
export const SET_USER_LOGGED_STATUS = 'SET_USER_LOGGED_STATUS';

type ReturnDataProps = {
  payload: {
    data?: Record<string, unknown>;
    userLoggedInfo?: Record<string, unknown>;
    isLoggedIn?: boolean;
  };
  type: string;
};

export function setUserInfo (data: Record<string, unknown>): ReturnDataProps {
  return {
    payload: {data},
    type: SET_USER_INFO,
  };
}

export function setUserLoggedInfo (
  userLoggedInfo: Record<string, unknown>,
): ReturnDataProps {
  return {
    payload: {userLoggedInfo},
    type: SET_USER_LOGGED_INFO,
  };
}

export function setUserLoggedStatus (isLoggedIn: boolean): ReturnDataProps {
  return {
    payload: {isLoggedIn},
    type: SET_USER_LOGGED_STATUS,
  };
}

export function fetchUserInfo (
  id: string,
  headers: unknown,
): (dispatch) => Promise<unknown> {
  return async dispatch => {
    const params = {
      headers,
    };

    try {
      const result = await dispatch(fetchApi(`/users/${id}`, {}, params));

      return dispatch(setUserInfo(result));
    } catch (error) {
      return dispatch(setUserLoggedStatus(false));
    }
  };
}
