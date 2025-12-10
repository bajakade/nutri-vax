import { parseDbAudit } from '@/database/property-types';
import { DbEntityStatics, EntityModel, Json } from '@/database/replication/types';

import { statics as base } from '../entity/statics';
import { Enrollment } from './types';

const statics: DbEntityStatics<Enrollment> = {
  ...base,
  syncSettings: () => ({
    entity: EntityModel.Enrollment,
    deleted: true,
    pageSize: 50,
    paginated: true,
  }),

  toLocal: (record: Json) => parseDbAudit(record),
  toBackend: (_doc: Enrollment) => ({}),
};

export default { statics };
