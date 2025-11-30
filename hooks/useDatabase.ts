import { useContext } from 'react';

import { DbContext, DbRef } from '../database';

export default function useDatabase(): DbRef {
  return useContext(DbContext);
}
