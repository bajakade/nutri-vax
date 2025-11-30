import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be more than 3 character'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
