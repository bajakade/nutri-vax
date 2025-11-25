import actions from './actions';
import { initState as initAuthState } from './reducer';

const authActions = { ...actions };

export { authActions, initAuthState };
