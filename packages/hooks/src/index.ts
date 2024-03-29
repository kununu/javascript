
// This is needed when using typescript, check https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
// eslint-disable-next-line import/no-extraneous-dependencies
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '@kununu/redux/dist/store';

import useKeydown from './hooks/useKeydown';
import useResponsive from './hooks/useResponsive';
import useFooterMetadata from './hooks/useFooterMetadata';

export {useKeydown, useResponsive, useFooterMetadata};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): (() => void) => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
