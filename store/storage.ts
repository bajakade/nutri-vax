import { initAuthState } from './auth';
import { RootState } from './reducers';

export const initStoreState = (): RootState => ({
  auth: initAuthState,
});

export default initStoreState;
