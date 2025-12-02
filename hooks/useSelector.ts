import { useContext } from 'react';

import { GlobalContext } from '../store';
import { RootState } from '../store/reducers';

export default function useSelector<T>(callback: (store: RootState) => T): T {
  const { store } = useContext(GlobalContext);
  return callback(store);
}
