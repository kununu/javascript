import {render} from '@testing-library/react';
import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {composedEnhancers, initializeStore, useStore} from '.';

jest.mock('redux-devtools-extension');

const mockReducer1 = () => ({key: 'value'});
const mockReducer2 = () => ({key: 'value2'});

const reducers = combineReducers({mockReducer1, mockReducer2});

describe('Redux store', () => {
  it('initializeStore returns a redux store object', () => {
    const initialStore = initializeStore(reducers);

    expect(typeof initialStore.getState).toEqual('function');
    expect(typeof initialStore.subscribe).toEqual('function');
    expect(typeof initialStore.replaceReducer).toEqual('function');
    expect(typeof initialStore.getState()).toEqual('object');
  });

  it('mounts a component with a redux store without crashing', async () => {
    const initialStore = initializeStore(reducers);
    const initialReduxState = initialStore.getState();

    // eslint-disable-next-line react/prop-types
    const Testcomponent = ({initialState}) => {
      const store = useStore(reducers, initialState);
      const {mockReducer1: mock} = store.getState();

      return (
        <Provider store={store}>
          <p>{mock.key}</p>
        </Provider>
      );
    };

    const {getByText} = render(<Testcomponent initialState={initialReduxState} />);

    expect(getByText('value')).toBeInTheDocument();
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
