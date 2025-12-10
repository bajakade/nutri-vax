import type { RxCollection, RxCollectionCreator, RxDatabase, RxDocument, RxJsonSchema } from 'rxdb';

import { BackendFetch, DictOf } from '@/types';

import { IdResponse } from '../collections/entity/types';

export enum EntityModel {
  Enrollment = 'enrollment',
}

export type Json = DictOf<any>;
export type IdValue = number | string;

export type SyncParams = Json & {
  dates?: [Date, Date];
};

export type SyncOptions = SyncParams & {
  force?: boolean;
};

export type SyncSettings = {
  // Entity endpoint
  entity: EntityModel;
  // Can fetch the list of deleted records?
  deleted?: boolean;
  // Should push changes to backend?
  push?: boolean;
  // Pagination
  paginated?: boolean;
  pageSize?: number;
  // Query string parameters
  params?: Json;
  // Interval between backend calls
  waitingTime?: number;
};

export type DbAudit = {
  id: IdValue;
  lastUpdated: string;
  pendingPush?: boolean;
  pushErrors?: Json;
};

export type DbEntitySchema<D extends DbAudit> = RxJsonSchema<D>;

export type DbEntityDocument<D extends DbAudit> = RxDocument<D>;

export type DbEntityStatics<D extends DbAudit> = {
  serialize: () => Promise<string>;
  syncSettings: () => SyncSettings;
  toLocal: (record: Json) => D & { isActive?: boolean };
  toBackend: (doc: D) => Json | null;
  add: (doc: Json) => Promise<IdResponse>;
  upd: (doc: Json) => Promise<IdResponse>;
  edit: (doc: Json) => Promise<IdResponse>;
};

// biome-ignore lint/complexity/noBannedTypes: default RxDB type
export type DbEntityCollection<D extends DbAudit> = RxCollection<D, {}, DbEntityStatics<D>>;

export type DbCollections = DictOf<RxCollectionCreator>;

export type DbCheckpoints = DictOf<boolean>;

export type SynchronizeFn = (
  db: RxDatabase,
  fetch: BackendFetch,
  opts: SyncOptions,
) => Promise<void>;
