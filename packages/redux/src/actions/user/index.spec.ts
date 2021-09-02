import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {fetchApi} from '@kununu/utils/dist';

import {
  fetchUserInfo,
  SET_USER_INFO,
  SET_USER_LOGGED_INFO,
  SET_USER_LOGGED_STATUS,
  setUserInfo,
  setUserLoggedInfo,
  setUserLoggedStatus,
} from '.';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {
  beforeEach(() => {
    (fetchApi as any).getCustomCallback().mockClear();
  });

  it('dispatches the setUserInfo action', () => {
    const store = mockStore({});

    const expectedData = {id: 123456};

    store.dispatch(setUserInfo(expectedData));
    const actions = store.getActions();

    expect(actions[0].type).toBe(SET_USER_INFO);
    expect(actions[0].payload.data).toEqual(expectedData);
  });

  it('dispatches the setUserLoggedInfo action', () => {
    const store = mockStore({});

    const expectedData = {name: ''};

    store.dispatch(setUserLoggedInfo(expectedData));
    const actions = store.getActions();

    expect(actions[0].type).toBe(SET_USER_LOGGED_INFO);
    expect(actions[0].payload.userLoggedInfo).toEqual(expectedData);
  });

  it('dispatches the setUserLoggedStatus action', () => {
    const store = mockStore({});

    const expectedData = {isLoggedIn: true};

    store.dispatch(setUserLoggedStatus(true));
    const actions = store.getActions();

    expect(actions[0].type).toBe(SET_USER_LOGGED_STATUS);
    expect(actions[0].payload).toEqual(expectedData);
  });

  it('dispatches the fetchUserInfo action', () => {
    const store = mockStore({});

    const mockUserId = '123456';
    const headers = {
      Cookie: 'mockCookieValue',
    };

    store.dispatch(fetchUserInfo(mockUserId, headers));
    const fetchCall = (fetchApi as any).getCustomCallback().mock.calls[0];

    const expectedUrl = `/users/${mockUserId}`;
    const expectedHeaders = {headers};

    expect((fetchApi as any).getCustomCallback().mock.calls.length).toBe(1);
    expect(fetchCall[0]).toBe(expectedUrl);
    expect(fetchCall[2]).toEqual(expectedHeaders);
  });

  it('dispatches the fetchUserInfo action but fails and logs out', async () => {
    const store = mockStore({});

    const expectedOutput = {
      message: 'error',
    };
    const mockUserId = undefined;
    const mockCookie = undefined;

    (fetchApi as any).setCustomOutput(false, expectedOutput);

    await store.dispatch(fetchUserInfo(mockUserId, mockCookie));
    const actions = store.getActions();

    const expectedData = {isLoggedIn: false};

    expect(actions.length).toBe(1);
    expect(actions[0].payload).toEqual(expectedData);
    expect(actions[0].type).toBe(SET_USER_LOGGED_STATUS);
  });
});
