import React from 'react';

import { authDb } from '@/constants/mock-data';
import { AuthError } from '@/services/auth';
import { authActions } from '@/store/auth';
import { LoginForm, Response, User } from '@/types';

import useBackend from './useBackend';
import useDatabase from './useDatabase';
import useDispatch from './useDispatch';

export interface AuthRef {
  processing: boolean;
  login: (formData: LoginForm) => Promise<Response>;
  logout: () => Promise<Response>;
}

export default function useAuth(): AuthRef {
  const { processing, backendFetch } = useBackend();
  const { dispatch } = useDispatch();
  const { database } = useDatabase();

  const mockAuthenticate = (formData: LoginForm) => {
    const authUser = authDb.find(({ username, email }) =>
      [username, email].includes(formData.username!),
    );

    if (!authUser) {
      return { ok: false, error: new Error('Invalid user') };
    }

    return { user: authUser };
  };
  /**
   * Log out:
   * - remove auth data from RxDB and local store
   */
  const logout = React.useCallback(() => {
    dispatch(authActions.logout());
    return database?.auth.logout();
  }, [database, dispatch]);

  /**
   * Log in:
   * - Uses backend endpoint with provided credentials
   * - Saves in RxDB and local store auth data: user, token and persisted username
   */
  const login = React.useCallback(
    async (formData: LoginForm) => {
      // const res = await authenticate(backendFetch, formData);
      const res = mockAuthenticate(formData);
      if ('user' in res) {
        const user = res.user as User;
        dispatch(authActions.login(user, user.token!, user.username));

        return database!.auth.login(user, user.token!, user.username);
      } else {
        return { ok: false, error: (res as AuthError).error };
      }
    },
    [database, dispatch],
  );

  return { processing, login, logout };
}
