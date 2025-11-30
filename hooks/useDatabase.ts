import { DbContext, DbRef } from '../database';

import { useContext } from 'react';

export default function useDatabase(): DbRef {
  return useContext(DbContext);
}
