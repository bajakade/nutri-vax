import React, { Context, createContext, useReducer } from 'react';
import reducers, { RootState } from './reducers';

import type { ViewProps } from 'react-native';
import initStoreState from './storage';

export const GlobalContext: Context<any> = createContext({} as RootState);

export function Provider({ children }: ViewProps) {
  const [store, dispatch] = useReducer(reducers, initStoreState());
  const data = { dispatch, store };

  return (
    <GlobalContext.Provider value={data}>
      {/* prettier-ignore */}
      {children}
    </GlobalContext.Provider>
  );
}
