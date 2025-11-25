import React from 'react';
import { User } from 'types/models/backend.user';

export enum AuthTypes {
  LOGIN = '@vaxtrac/auth/LOGIN',
  LOGOUT = '@vaxtrac/auth/LOGOUT',
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
