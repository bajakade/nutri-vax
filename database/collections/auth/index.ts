import schema from './schema';
import statics from './statics';
export type { AuthCollection, AuthDocument } from './types';

export default { ...schema, ...statics };
