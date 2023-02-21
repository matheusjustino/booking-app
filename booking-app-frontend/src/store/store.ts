import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	Store,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from '.';

export const store = configureStore({
	reducer: combineReducers(reducers),
	middleware: [thunkMiddleware],
	devTools: process.env.NODE_ENV !== 'production',
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<Store<AppState>>(makeStore);
