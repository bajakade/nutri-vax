import { User } from '@/types/interface';

import type { AuthCollection, AuthStatics } from './types';

const ID = '@nutri-vax/authData';

const statics: AuthStatics = {
  /**
   * Creates the unique document
   *
   * @returns Promise
   */
  init: function () {
    const collection = this as AuthCollection;

    // create if missing but ignore error if it already exists
    return collection
      .insert({ id: ID })
      .then(() => ({ ok: true }))
      .catch(() => ({ ok: true }));
  },

  /**
   * Returns the unique document
   *
   * @returns RxQuery
   */
  getAuth: function () {
    const collection = this as AuthCollection;

    return collection.findOne({ selector: { id: ID } });
  },

  /**
   * Sets authentication data (current user, token and maybe persisted username)
   *
   * @param {IUser}  user      User data
   * @param {string} token     User token
   * @param {string} username  User username
   * @returns Promise
   */
  login: function (user: User, token: string, username?: string) {
    return this.getAuth()
      .update({ $set: { user, token, username } })
      .then(() => ({ ok: true }))
      .catch((err: Error) => {
        console.error('Error while adding logged in user data');
        console.error(err);
        return { ok: false, error: err };
      });
  },

  /**
   * Removes authentication data (sets "user" and "password" to null)
   *
   * @returns Promise
   */
  logout: function () {
    return this.getAuth()
      .update({ $set: { user: null, token: null } })
      .then(() => ({ ok: true }))
      .catch((err: Error) => {
        console.error('Error while removing logged in user data');
        console.error(err);
        return { ok: false, error: err };
      });
  },
};

export default { statics };
