import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';

import { DbAudit, DbEntityStatics, Json } from '@/database/replication/types';

export type IdResponse = Response & { id?: string };
export type EntitySchema = RxJsonSchema<DbAudit>;
export type EntityMethods = {
  serialize: () => Promise<string>;
  add: (data: Json) => Promise<IdResponse>;
  upd: (data: Json) => Promise<IdResponse>;
  edit: (data: Json) => Promise<IdResponse>;
};
export type EntityDocument = RxDocument<DbAudit, EntityMethods>;

export type EntityCollection = RxCollection<DbAudit, EntityMethods, DbEntityStatics<any>>;
