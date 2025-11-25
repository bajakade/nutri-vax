import { AuthAction, AuthReducer, AuthState, AuthTypes } from './types';

export const initState: AuthState = {
  user: undefined,
  token: undefined,
  persistedUsername: undefined,
};

const login: AuthReducer<AuthState> = (state, action) => {
  const { data } = action;
  return { ...state, ...data };
};

const logout: AuthReducer<void> = (state, _) => ({
  ...state,
  user: undefined,
  token: undefined,
});

const authReducerMap = new Map<AuthTypes, AuthReducer<any>>([
  [AuthTypes.LOGIN, login],
  [AuthTypes.LOGOUT, logout],
]);

const reducer = (state: AuthState = initState, action: AuthAction<any>): AuthState => {
  const authReducer = authReducerMap.get(action.type);
  if (authReducer) {
    return authReducer(state, action);
  }
  return state;
};

export default reducer;
