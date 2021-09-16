import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';
import {fetchApi, isClientRender} from '@kununu/utils';

import {
  fetchSearchProfiles,
  FAILURE_SEARCH_PROFILES,
  SUCCESS_SEARCH_PROFILES,
  REQUEST_SEARCH_PROFILES,
} from '.';

const application = 'application';

jest.mock('@kununu/kununu-utils/dist/kununu-logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('searchProfiles actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    fetchApi.getCustomCallback().mockClear();
    isClientRender.mockClear();
    logger.error.mockClear();
  });

  it('calls api via fetchSearchProfiles and should use the correct endpoint', () => {
    const store = mockStore({});

    store.dispatch(fetchSearchProfiles(application, {country: 'at', q: 'ku'}));

    const actions = store.getActions();
    const fetchCall = fetchApi.getCustomCallback().mock.calls[0];

    expect(fetchApi.getCustomCallback().mock.calls.length).toBe(1);

    expect(fetchCall[0]).toBe('/search/profiles');
    expect(fetchCall[1]).toEqual({country: 'at', q: 'ku'});
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(REQUEST_SEARCH_PROFILES);
  });

  it('calls api via fetchSearchProfiles and should dispatch success profile searchProfiles', async () => {
    const store = mockStore({});
    const expectedOutput = [
      {
        name: 'Kununu name',
        slug: 'kununu',
      },
      {
        name: 'Kununu name 1',
        slug: 'kununu1',
      },
    ];

    fetchApi.setCustomOutput(true, expectedOutput);
    await store.dispatch(fetchSearchProfiles(application, {country: 'at', q: 'ku'}));
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expect(actions[0].type).toBe(REQUEST_SEARCH_PROFILES);
    expect(actions[1].type).toBe(SUCCESS_SEARCH_PROFILES);
    expect(actions[1].data).toEqual(expectedOutput);
  });

  it('calls api via fetchSearchProfiles and should dispatch failure profile searchProfiles', async () => {
    const store = mockStore({});
    const expectedOutput = {
      message: 'error',
    };

    fetchApi.setCustomOutput(false, expectedOutput);
    await store.dispatch(fetchSearchProfiles(application, {country: 'at', q: 'ku'}));
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expect(actions[0].type).toBe(REQUEST_SEARCH_PROFILES);
    expect(actions[1].type).toBe(FAILURE_SEARCH_PROFILES);
    expect(actions[1].err).toEqual(expectedOutput);
  });

  it('should not call logger because it is a client render', async () => {
    isClientRender.mockImplementation(() => true);
    const store = mockStore({});

    fetchApi.setCustomOutput(false, {});
    await store.dispatch(fetchSearchProfiles(application, {country: 'at', q: 'ku'}));

    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should call logger', async () => {
    isClientRender.mockImplementation(() => false);
    const store = mockStore({});

    fetchApi.setCustomOutput(false, {});
    await store.dispatch(fetchSearchProfiles(application, {country: 'at', q: 'ku'}));

    expect(logger.error).toHaveBeenCalled();
  });
});
