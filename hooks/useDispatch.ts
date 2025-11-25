import { Dispatcher, RootState } from '../store/reducers';

import { useContext } from 'react';
import { GlobalContext } from '../store';

export default function useDispatch(): {
  store: RootState;
  dispatch: Dispatcher;
} {
  return useContext(GlobalContext);
}
