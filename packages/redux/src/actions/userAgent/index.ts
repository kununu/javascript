export const SET_USER_AGENT = 'SET_USER_AGENT';

export function setUserAgent (ua): Record<string, any> {
  return {payload: ua, type: SET_USER_AGENT};
}
