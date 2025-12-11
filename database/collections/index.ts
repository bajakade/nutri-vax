import { EntityModel } from '../replication/types';
import authCollection, { AuthCollection } from './auth';
import enrollments, { EnrollmentCollection } from './enrollment';

/**
 * Represents the NutriVax collections.
 */
export type NutriVaxCollection = {
  auth: AuthCollection;
  [EntityModel.Enrollment]: EnrollmentCollection;
};

export const collections = {
  auth: { ...authCollection },
  [EntityModel.Enrollment]: { ...enrollments },
};
