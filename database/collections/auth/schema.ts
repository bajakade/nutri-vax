import { MigrationStrategies, RxJsonSchema } from 'rxdb';

import { User } from '@/types/interface';

const schema: RxJsonSchema<User> = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      final: true,
      maxLength: 255,
    },
    username: {
      type: 'string',
      maxLength: 100,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    facility: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          maxLength: 255,
        },
        name: {
          type: 'string',
          maxLength: 100,
        },
      },
    },
    token: {
      type: 'string',
    },
  },
  required: ['username', 'email', 'token'],
};

const migrationStrategies: MigrationStrategies = {
  1: (doc) => doc,
};

export default { schema, migrationStrategies };
