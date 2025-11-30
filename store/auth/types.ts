import React from 'react';

import { User } from '@/types';

export enum AuthTypes {
  LOGIN = '@nutrivax/auth/LOGIN',
  LOGOUT = '@nutrivax/auth/LOGOUT',
}

export type AuthState = {
  user?: User;
  token?: string;
  persistedUsername?: string;
};

export type AuthAction<T> = {
  type: AuthTypes;
  data: T;
};

export type AuthReducer<T> = React.Reducer<AuthState, AuthAction<T>>;
