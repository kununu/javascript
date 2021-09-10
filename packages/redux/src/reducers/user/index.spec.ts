import {
  SET_USER_INFO,
  SET_USER_LOGGED_STATUS,
  SET_USER_LOGGED_INFO,
} from 'actions/user';

import userReducer from '.';

const initialState = {
  id: null,
  image: null,
  isLoggedIn: false,
  isXingUser: false,
  name: null,
  position: null,
  profileName: null,
  userId: null,
  userProfileType: '',
};

describe('#reducer user', () => {
  it('should return state as is without a valid action type', () => {
    const action = {
      payload: {},
      type: 'INVALID_TYPE',
    };
    const state = userReducer(undefined, action);
    const expectedState = initialState;

    expect(state).toEqual(expectedState);
  });

  it('handles the SET_USER_INFO action with empty userProfilesRoles', () => {
    const action = {
      payload: {
        data: {
          userProfilesRoles: [],
        },
      },
      type: SET_USER_INFO,
    };

    const state = userReducer(undefined, action);
    const expectedState = {
      ...initialState,
      userProfilesRoles: [],
    };

    expect(state).toEqual(expectedState);
  });

  it('handles the SET_USER_INFO action with userProfilesRoles', () => {
    const mockUserProfilesRoles = [{
      profileName: 'Test Profile Name',
      profileUuid: 'a24bc9e8-13a4-11eb-abff-0242ac11002d',
      userImage: '/user/image',
      userName: 'Test Name',
      userPosition: 'Test Position',
    }];

    const action = {
      payload: {
        data: {
          userProfilesRoles: mockUserProfilesRoles,
        },
      },
      type: SET_USER_INFO,
    };

    const state = userReducer(undefined, action);

    const expectedState = {
      id: null,
      image: '/user/image',
      isLoggedIn: false,
      isXingUser: false,
      name: 'Test Name',
      position: 'Test Position',
      profileName: 'Test Profile Name',
      userId: null,
      userProfilesRoles: mockUserProfilesRoles,
      userProfileType: '',
    };

    expect(state).toEqual(expectedState);
  });

  it('handles the SET_USER_INFO action with multiple userProfilesRoles', () => {
    const mockUserProfilesRoles = [
      {
        profileUuid: '123456',
        userImage: '/user/image1',
        userName: 'Test Profile Name 1',
        userPosition: 'Test Position 1',
      },
      {
        profileUuid: '123456',
        userImage: '/user/image2',
        userName: 'Test Profile Name 2',
        userPosition: 'Test Position 2',
      },
    ];

    const action = {
      payload: {
        data: {
          userProfilesRoles: mockUserProfilesRoles,
        },
      },
      type: SET_USER_INFO,
    };

    const state = userReducer(undefined, action);

    const expectedState = {
      id: null,
      image: '/user/image1',
      isLoggedIn: false,
      isXingUser: false,
      name: 'Test Profile Name 1',
      position: 'Test Position 1',
      profileName: '',
      userId: null,
      userProfilesRoles: mockUserProfilesRoles,
      userProfileType: '',
    };

    expect(state).toEqual(expectedState);
  });

  it('handles the SET_USER_LOGGED_STATUS action with empty data', () => {
    const action = {
      payload: {},
      type: SET_USER_LOGGED_STATUS,
    };

    const loggedInState = userReducer(undefined, action).isLoggedIn;
    const expectedLoggedInState = initialState.isLoggedIn;

    expect(loggedInState).toEqual(expectedLoggedInState);
  });

  it('handles the SET_USER_LOGGED_STATUS action when the user is not logged in', () => {
    const action = {
      payload: {
        isLoggedIn: false,
      },
      type: SET_USER_LOGGED_STATUS,
    };

    const loggedInState = userReducer(undefined, action).isLoggedIn;
    const expectedLoggedInState = false;

    expect(loggedInState).toEqual(expectedLoggedInState);
  });

  it('handles the SET_USER_LOGGED_STATUS action when the user is logged in', () => {
    const action = {
      payload: {
        isLoggedIn: true,
      },
      type: SET_USER_LOGGED_STATUS,
    };

    const loggedInState = userReducer(undefined, action).isLoggedIn;
    const expectedLoggedInState = true;

    expect(loggedInState).toEqual(expectedLoggedInState);
  });

  it('handles the SET_USER_LOGGED_INFO action', () => {
    const action = {
      payload: {
        userLoggedInfo: {
          isXingUser: true,
          userId: 3,
          userProfileType: 'c0b2',
        },
      },
      type: SET_USER_LOGGED_INFO,
    };

    const state = userReducer(undefined, action);

    expect(state).toEqual({
      id: null,
      image: null,
      isLoggedIn: false,
      isXingUser: true,
      name: null,
      position: null,
      profileName: null,
      userId: 3,
      userProfileType: 'c0b2',
    });
  });
});
