import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {fetchApi} from '@kununu/utils/dist';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';

import {receiveMeta, fetchMeta, RECEIVE_META} from '.';

jest.mock('@kununu/kununu-utils/dist/kununu-logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));
const application = 'application';
const mockStore = configureMockStore([thunk]);

describe('metadata actions', () => {
  beforeEach(() => {
    fetchApi.getCustomCallback().mockClear();
    logger.error.mockClear();
  });

  it('Dispatches the receiveMeta action', async () => {
    const store = mockStore({});

    store.dispatch(receiveMeta({}));

    const actions = store.getActions();

    expect(actions[0].type).toBe(RECEIVE_META);
  });

  it('fetches meta', async () => {
    const store = mockStore({});

    await store.dispatch(fetchMeta(application, 'at'));

    const fetchCall = fetchApi.getCustomCallback().mock.calls[0];

    expect(fetchApi.getCustomCallback().mock.calls.length).toBe(1);
    expect(fetchCall[0]).toBe('/meta');
  });

  it('should call logger', async () => {
    const store = mockStore({});

    fetchApi.setCustomOutput(false, {});
    await store.dispatch(fetchMeta(application, 'at'));

    expect(logger.error).toHaveBeenCalled();
  });
});
