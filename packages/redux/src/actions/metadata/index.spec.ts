import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchApi from '@kununu/utils/dist';

import {receiveMeta, fetchMeta, RECEIVE_META} from '.';

jest.mock('@kununu/utils/dist');

const mockStore = configureMockStore([thunk]);

describe('Metadata actions', () => {
  it('Dispatches the receiveMeta action', () => {
    const store = mockStore({});

    store.dispatch(receiveMeta({}));

    const actions = store.getActions();

    expect(actions[0].type).toBe(RECEIVE_META);
  });

  it('fetches meta successfully', () => {
    const store = mockStore({});

    store.dispatch(fetchMeta('at'));

    const fetchCall = (fetchApi as any).mock.calls[0];

    expect(fetchApi.mock.calls.length).toBe(1);
    expect(fetchCall[0]).toBe('/meta');
  });
});
