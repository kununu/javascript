import {combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {composedEnhancers, initializeStore} from '.';

jest.mock('redux-devtools-extension');

const mockReducer1 = () => ({key: 'value'});
const mockReducer2 = () => ({key: 'value2'});

const reducers = combineReducers({mockReducer1, mockReducer2});

describe('Redux Store', () => {
  it('initializeStore returns a redux store object', () => {
    const initialStore = initializeStore(reducers);

    expect(typeof initialStore.getState).toEqual('function');
    expect(typeof initialStore.subscribe).toEqual('function');
    expect(typeof initialStore.replaceReducer).toEqual('function');
    expect(typeof initialStore.getState()).toEqual('object');
  });
});

describe('Redux Dev tools', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV;
    jest.clearAllMocks();
  });

  it('has redux devtools in development', () => {
    process.env.NODE_ENV = 'development';
    composedEnhancers();
    expect(composeWithDevTools).toHaveBeenCalled();
  });

  it('has no redux devtools in production', () => {
    process.env.NODE_ENV = 'production';
    composedEnhancers();
    expect(composeWithDevTools).not.toHaveBeenCalled();
  });
});
