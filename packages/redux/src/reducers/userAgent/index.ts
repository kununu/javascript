import {SET_USER_AGENT} from 'actions/userAgent';

const defaultState = '';

export default function userAgentReducer (
  state = defaultState,
  action: {type?: string; payload?: string} = {},
): string {
  switch (action.type) {
    case SET_USER_AGENT:
      return action.payload;
    default:
      return state;
  }
}
