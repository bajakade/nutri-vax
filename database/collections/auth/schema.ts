import { User } from '@/types/interface';
import { RxJsonSchema } from 'rxdb';

const schema: RxJsonSchema<User> = {
  version: 0,
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
      type: 'string',
    },
    token: {
      type: 'string',
    },
  },
  required: ['username', 'email', 'token'],
};

export default { schema };
