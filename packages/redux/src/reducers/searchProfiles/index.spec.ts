import {
  REQUEST_SEARCH_PROFILES,
  SUCCESS_SEARCH_PROFILES,
  FAILURE_SEARCH_PROFILES,
} from 'actions/searchProfiles';

import searchProfilesReducer from '.';

const initialState = {
  err: null,
  fetchingSearchProfiles: false,
  noResultsFound: false,
  profiles: [],
};

describe('#reducer searchProfiles', () => {
  it('should return state as is without a valid action type', () => {
    const action = {
      type: 'INVALID_TYPE',
    };
    const state = searchProfilesReducer(undefined, action);
    const expectedState = initialState;

    expect(state).toEqual(expectedState);
  });

  it('should handle the REQUEST_SEARCH_PROFILES action', () => {
    const action = {
      type: REQUEST_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(undefined, action);
    const expectedState = {
      err: null,
      fetchingSearchProfiles: true,
      noResultsFound: false,
      profiles: [],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the REQUEST_SEARCH_PROFILES action with previous data on state', () => {
    const action = {
      type: REQUEST_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(initialState, action);
    const expectedState = {
      err: null,
      fetchingSearchProfiles: true,
      noResultsFound: false,
      profiles: [],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the SUCCESS_SEARCH_PROFILES action', () => {
    const action = {
      data: [{
        location: {
          city: 'New York',
          countryCode: 'us',
        },
        name: 'Test Company',
        slug: 'test-company',
      }],
      type: SUCCESS_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(undefined, action);
    const expectedState = {
      err: null,
      fetchingSearchProfiles: false,
      noResultsFound: false,
      profiles: [{
        city: 'New York',
        countryCode: 'us',
        name: 'Test Company',
        slug: 'test-company',
      }],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the SUCCESS_SEARCH_PROFILES action with previous data on state', () => {
    const action = {
      data: [{
        location: {
          city: 'New York',
          countryCode: 'us',
        },
        name: 'Test Company',
        slug: 'test-company',
      }],
      type: SUCCESS_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(initialState, action);
    const expectedState = {
      err: null,
      fetchingSearchProfiles: false,
      noResultsFound: false,
      profiles: [{
        city: 'New York',
        countryCode: 'us',
        name: 'Test Company',
        slug: 'test-company',
      }],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the SUCCESS_SEARCH_PROFILES action without locations', () => {
    const action = {
      data: [{
        location: undefined,
        name: 'Test Company',
        slug: 'test-company',
      }],
      type: SUCCESS_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(undefined, action);
    const expectedState = {
      err: null,
      fetchingSearchProfiles: false,
      noResultsFound: false,
      profiles: [{
        city: '',
        countryCode: undefined,
        name: 'Test Company',
        slug: 'test-company',
      }],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the FAILURE_SEARCH_PROFILES action', () => {
    const mockError = 'Test Error';
    const action = {
      err: mockError,
      type: FAILURE_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(undefined, action);
    const expectedState = {
      err: mockError,
      fetchingSearchProfiles: false,
      noResultsFound: true,
      profiles: [],
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle the FAILURE_SEARCH_PROFILES action with previous data on state', () => {
    const mockError = 'Test Error';
    const action = {
      err: mockError,
      type: FAILURE_SEARCH_PROFILES,
    };

    const state = searchProfilesReducer(initialState, action);
    const expectedState = {
      err: mockError,
      fetchingSearchProfiles: false,
      noResultsFound: true,
      profiles: [],
    };

    expect(state).toEqual(expectedState);
  });
});
