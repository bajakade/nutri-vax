import { MigrationStrategies } from 'rxdb';

import { dbAuditProps, dbPropTypes, extraData } from '@/database/property-types';

import { EnrollmentSchema } from './types';

const { YES_NO_ENUM, INTEGER, STRING, STRING_INDEX } = dbPropTypes;

const schema: EnrollmentSchema = {
  version: 1,

  title: 'Enrollment Registry',
  description: 'Stores enrollment records locally',

  primaryKey: 'id',
  type: 'object',
  properties: {
    ...dbAuditProps,
    ...extraData,

    // ATTRIBUTES ----------------------------
    name: STRING,
    sex: STRING,
    settlement: STRING,
    age: INTEGER,
    muac: INTEGER,
    oedema: YES_NO_ENUM,
    zScore: YES_NO_ENUM,

    // indices
    refNumber: STRING_INDEX,
    immunizationNumber: STRING_INDEX,
  },

  required: [],
  // add "sort by" fields as indexes
  indexes: ['created', 'lastUpdated', 'refNumber', 'immunizationNumber'],
};

const migrationStrategies: MigrationStrategies = {
  1: (doc) => doc,
};

export default { schema, migrationStrategies };
