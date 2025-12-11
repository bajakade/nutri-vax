import React from 'react';

import authReducer from './auth/reducer';
import type { AuthState } from './auth/types';

export type Action<T> = {
  type: string;
  data: T;
};

export type Dispatcher = React.Dispatch<Action<any>>;
export type RootState = {
  auth: AuthState;
};

export type RootKey = keyof RootState;
export type RootValue = RootState[RootKey];

export type Reducer = React.Reducer<RootValue, Action<any>>;
export type RootReducer = React.Reducer<RootState, Action<any>>;

function combineReducer(reducers: Record<RootKey, Reducer>): RootReducer {
  return function (state: RootState, action: Action<any>): RootState {
    return Object.keys(reducers).reduce(
      (combinedState, name) => ({
        ...combinedState,
        [name]: reducers[name as RootKey](combinedState[name as RootKey], action),
      }),
      state,
    );
  };
}

const allReducers = combineReducer({
  auth: authReducer,
} as Record<RootKey, Reducer>);

export default allReducers;
