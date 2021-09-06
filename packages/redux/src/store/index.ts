import {useMemo} from 'react';
import {
  createStore, applyMiddleware, compose, StoreEnhancer,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let store;

export const composedEnhancers = (): StoreEnhancer<
  {dispatch: unknown},
  unknown
> => process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunkMiddleware)) :
  compose(applyMiddleware(thunkMiddleware));

function initStore (reducers, initialState) {
  return createStore(reducers, initialState, composedEnhancers());
}

export const initializeStore = (
  reducers: unknown,
  preloadedState: Record<string, unknown>,
): AppDispatch => {
  let _store = store ?? initStore(reducers, preloadedState); //eslint-disable-line

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore(reducers, {
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore (reducers: unknown, initialState: Record<string, unknown>): AppDispatch {
  store = useMemo(() => initializeStore(reducers, initialState), [reducers, initialState]);

  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
