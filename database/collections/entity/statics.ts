import { DbAudit, Json } from '@/database/replication/types';
import { genUUID } from '@/helpers';

import { EntityCollection, EntityDocument, EntityMethods } from './types';

type TRecord = DbAudit & {
  [name: string]: any;
};

export const statics: EntityMethods = {
  /**
   * Serializes document
   *
   * @param {object} doc  Document
   * @returns string
   */
  serialize: async function (): Promise<string> {
    const doc = this as EntityDocument;

    return JSON.stringify(doc.toJSON(true));
  },

  add: function (data: Json) {
    const collection = this as Json;

    const doc: Partial<TRecord> = {
      id: genUUID(),
      ...data,
      // Audit fields
      isDeleted: false,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),

      // The value will change after synching with backend
      pendingPush: true,
    };

    return collection
      .insert(doc)
      .then((newDoc: any) => ({ ok: true, id: newDoc.id }))
      .catch((err: Error) => {
        console.error('Error while inserting DB document');
        console.error(err);
        return { ok: false, error: err };
      });
  },

  /**
   * Updates document
   *
   * @param {object} data  Document
   * @returns Promise
   */
  upd: async function (data: Json) {
    const collection = this as EntityCollection;

    const { id, ...props } = data;

    const doc = await collection.findOne({ selector: { id } }).exec();
    if (!doc) {
      return { ok: false, id, error: new Error('not-found') };
    }

    return doc
      .atomicPatch({ ...props })
      .then(() => ({ ok: true, id }))
      .catch((err: Error) => {
        console.error('Error while updating DB document');
        console.error(err);
        return { ok: false, id, error: err };
      });
  },

  /**
   * Updates document (sets audit property values used in sync)
   *
   * @param {object} data  Document
   * @returns Promise
   */
  edit: async function (data: Json) {
    return this.upd({
      ...data,
      // Audit properties
      lastUpdated: new Date().toISOString(),
      pendingPush: true,
    });
  },
};
