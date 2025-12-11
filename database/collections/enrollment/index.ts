import schema from './schema';
import statics from './statics';
export type { EnrollmentCollection, EnrollmentDocument } from './types';

export default {
  ...statics,
  ...schema,
};
