import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {setUserAgent, SET_USER_AGENT} from '.';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';

describe('userAgent actions', () => {
  it('successfully sets userAgent state', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});

    store.dispatch(setUserAgent(USER_AGENT));

    const [action] = store.getActions();

    expect(action.type).toBe(SET_USER_AGENT);
    expect(action.payload).toBe(USER_AGENT);
  });
});
