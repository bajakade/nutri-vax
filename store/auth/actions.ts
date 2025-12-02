import { User } from '@/types';

import { AuthTypes } from './types';

const login = (user?: Omit<User, 'id'>, token?: string, persistedUsername?: string) => ({
  type: AuthTypes.LOGIN,
  data: { user, token, persistedUsername },
});

const logout = () => ({ type: AuthTypes.LOGOUT, data: {} });

const actions = {
  logout,
  login,
};

export default actions;
