import {RECEIVE_META} from 'actions/metadata';

import reducer from '.';

describe('metadata reducer', () => {
  it('should return state as is without an action', () => {
    const action = undefined;

    const expectedState = {};

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('receives metadata', () => {
    const action = {
      payload: {
        data: {industries: []},
      },
      type: RECEIVE_META,
    };

    expect(reducer({}, action)).toEqual({industries: []});
  });
});
