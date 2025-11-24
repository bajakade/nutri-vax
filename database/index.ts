import { RxDatabase, addRxPlugin, createRxDatabase, removeRxDatabase } from 'rxdb';
import { getRxStorageSQLiteTrial, getSQLiteBasicsNodeNative } from 'rxdb/plugins/storage-sqlite';
import { NutriVaxCollection, collections } from './collections';

import { DatabaseSync } from 'node:sqlite';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

/**
 * Represents the VaxTrac RxDatabase-based type.
 */
export type NutriDatabase = RxDatabase<NutriVaxCollection>;

export interface DbRef {
  database?: NutriDatabase;
  error?: Error;
}

const DB_NAME = 'nutri_vax';

const prepareRxDB = () => {
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBMigrationPlugin);
  addRxPlugin(RxDBQueryBuilderPlugin);
  addRxPlugin(RxDBUpdatePlugin);
};

const getStorage = () =>
  getRxStorageSQLiteTrial({
    sqliteBasics: getSQLiteBasicsNodeNative(DatabaseSync),
  });

export const destroyDB = async (): Promise<void> => {
  await removeRxDatabase(DB_NAME, getStorage());
  console.info('DB dropped');
};

export const initializeDB = async (): Promise<DbRef> => {
  const storage = getStorage();
  try {
    prepareRxDB();
    const database = await createRxDatabase<NutriVaxCollection>({
      name: DB_NAME,
      storage: storage,
      ignoreDuplicate: true,
      multiInstance: false,
      eventReduce: true,
    });

    try {
      await database.addCollections({ ...collections });
      console.debug('Added collections');

      // create auth entry
      await database.auth.init();
      console.debug('Added auth entry');
    } catch (error: any) {
      console.error('Error while adding collections');
      console.error(error);

      return { error };
    }
    return { database };
  } catch (error) {
    console.debug('Database is not connected');
    console.error('Error while creating database');
    console.error(error);

    return { error };
  }
};
