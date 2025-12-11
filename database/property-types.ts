import type { JsonSchema } from 'rxdb';

import { DbAudit, Json } from './replication/types';

// from RxDB rx-schema.d.ts
interface TopLevelProperty extends JsonSchema {
  default?: any;
}

/** Primary Key type */
const PK: JsonSchema = { type: 'string', final: true, maxLength: 255 };

/** Boolean type */
const BOOLEAN: TopLevelProperty = { type: 'boolean', default: false };

/** Date type */
const DATE: JsonSchema = { type: ['string', 'null'], format: 'date', maxLength: 10 };

/** Date type (not-null) */
const DATE_INDEX: JsonSchema = { ...DATE, type: 'string' };

/** Date-time type */
const DATE_TIME: JsonSchema = { type: ['string', 'null'], format: 'date-time', maxLength: 50 };

/** Date-time type (not-null) */
const DATE_TIME_INDEX: JsonSchema = { ...DATE_TIME, type: 'string' };

/** Integer type */
const INTEGER: TopLevelProperty = { type: ['integer', 'null'] };

/** Integer type (not-null) */
const INTEGER_INDEX: TopLevelProperty = { type: 'integer', default: 0, multipleOf: 1 };

/** Positive Integer type (not-null) */
const INTEGER_INDEX_POSITIVE: TopLevelProperty = { ...INTEGER_INDEX, minimum: 0 };

/** Numeric type */
const NUMBER: TopLevelProperty = { type: 'number', default: 0.0 };

/** Numeric type */
const NUMBER_POSITIVE: TopLevelProperty = { type: 'number', default: 0.0, minimum: 0.0 };

/** String type */
const STRING: JsonSchema = { type: ['string', 'null'] };

/** String type (not-null) */
const STRING_INDEX: JsonSchema = { type: 'string', maxLength: 255 };

/** E-Mail type */
const EMAIL: JsonSchema = { ...STRING, format: 'email' };

/** Uri type */
const URI: JsonSchema = { ...STRING, format: 'uri' };

/** Object type (does not indicate the properties) */
const OBJECT = { type: ['object', 'null'] };

/** Array of strings type */
const STRINGS = { type: 'array', items: STRING, uniqueItems: true };

/** Array of objects type */
const ARRAY = { type: 'array', items: OBJECT, uniqueItems: true };

const YES_NO_ENUM = {
  type: 'string',
  enum: ['Y', 'N'],
};

/**
 * Property types
 */
export const dbPropTypes = {
  ARRAY,
  BOOLEAN,
  DATE,
  DATE_INDEX,
  DATE_TIME,
  DATE_TIME_INDEX,
  EMAIL,
  INTEGER,
  INTEGER_INDEX,
  INTEGER_INDEX_POSITIVE,
  NUMBER,
  NUMBER_POSITIVE,
  OBJECT,
  PK,
  STRING,
  STRING_INDEX,
  STRINGS,
  URI,
  YES_NO_ENUM,
};

export const dbAuditProps = {
  id: dbPropTypes.PK,
  lastUpdated: dbPropTypes.DATE_TIME_INDEX,
  pendingPush: dbPropTypes.BOOLEAN,
  pushErrors: dbPropTypes.OBJECT,
};

export const extraData = {
  created: dbPropTypes.DATE_TIME_INDEX,
  // "deleted" is reserved by RxDB
  isDeleted: dbPropTypes.BOOLEAN,
  modified: dbPropTypes.BOOLEAN,
};

export const parseDbAudit = (record: Json): DbAudit & { isActive: boolean } => ({
  id: record.id.toString(),
  lastUpdated: record.updated_at,
  pendingPush: false,
  pushErrors: undefined,
  isActive: record.is_active,
});
