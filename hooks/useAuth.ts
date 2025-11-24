import { DictOf, LoginForm, User } from '@/types';

import { authenticate } from '@/services/auth';
import React from 'react';
import useBackend from './useBackend';

export interface AuthRef {
  processing: boolean;
  login: (formData: LoginForm) => Promise<Response>;
  logout: () => Promise<Response>;
}

export default function useAuth(database: DictOf<any>): AuthRef {
  const { processing, backendFetch } = useBackend();

  /**
   * Log out:
   * - remove auth data from RxDB and local store
   */
  const logout = React.useCallback(() => {
    return database?.auth.logout();
  }, [database]);

  /**
   * Log in:
   * - Uses backend endpoint with provided credentials
   * - Saves in RxDB and local store auth data: user, token and persisted username
   */
  const login = React.useCallback(
    async (formData: LoginForm) => {
      const res = await authenticate(backendFetch, formData);
      if ('user' in res) {
        const user = res as User;

        return database!.auth.login(user, user.token!, user.username);
      } else {
        return { ok: false, error: res.error };
      }
    },
    [database, backendFetch],
  );

  return { processing, login, logout };
}
