import { useContext } from 'react';

import { GlobalContext } from '../store';
import { Dispatcher, RootState } from '../store/reducers';

export default function useDispatch(): {
  store: RootState;
  dispatch: Dispatcher;
} {
  return useContext(GlobalContext);
}
