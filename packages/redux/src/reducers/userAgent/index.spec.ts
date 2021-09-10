import {
  SET_USER_AGENT,
} from 'actions/userAgent';

import reducer from '.';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';

describe('reducer userAgent', () => {
  it('handles userAgent successfully ', () => {
    const action = {
      payload: USER_AGENT,
      type: SET_USER_AGENT,
    };

    expect(reducer('', action)).toEqual(USER_AGENT);
  });

  it('handles empty action successfully ', () => {
    expect(reducer()).toEqual('');
  });

  it('handles default state successfully ', () => {
    expect(reducer(undefined, {})).toEqual('');
  });
});
