import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';

import { DbAudit, DbEntityStatics } from '@/database/replication/types';
import { EnrollmentAttributes } from '@/types';

import { EntityMethods } from '../entity/types';

export interface Enrollment extends DbAudit, EnrollmentAttributes {}
export type IdResponse = Response & { id?: string };
export type EnrollmentSchema = RxJsonSchema<Enrollment>;
export type EnrollmentMethods = EntityMethods;
export type EnrollmentDocument = RxDocument<Enrollment, EnrollmentMethods>;
export type EnrollmentCollection = RxCollection<
  Enrollment,
  EnrollmentMethods,
  DbEntityStatics<Enrollment>
>;
