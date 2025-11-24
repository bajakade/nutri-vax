import authCollection, { AuthCollection } from './auth';

/**
 * Represents the NutriVax collections.
 */
export type NutriVaxCollection = {
  auth: AuthCollection;
};

export const collections = {
  auth: { ...authCollection },
};
