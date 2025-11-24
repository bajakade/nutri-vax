import { RxCollection, RxDocument, RxJsonSchema, RxQuery } from 'rxdb';

import { Response } from '@/types';
import { User } from '@/types/interface';

export type AuthSchema = RxJsonSchema<User>;
export type AuthMethods = {};
export type AuthDocument = RxDocument<User, AuthMethods>;
export type AuthStatics = {
  init: () => Promise<Response>;
  getAuth: () => RxQuery;
  login: (user: User, token: string, username?: string) => Promise<Response>;
  logout: () => Promise<Response>;
};
export type AuthCollection = RxCollection<Partial<User>, AuthMethods, AuthStatics>;
