import { useCallback, useState } from 'react';
import { FormBase, FormError, Schema } from '../types/form';

import { validateForm } from '@/helpers';

export default function useFormValidator<T extends FormBase>(schema: Schema) {
  const [errors, setErrors] = useState<FormError[]>();

  const clearErrors = useCallback(() => {
    setErrors(undefined);
  }, []);

  const getErrorProps = useCallback(
    (path: keyof T, message?: string) => {
      if (errors) {
        const error = errors.find((err: FormError) => err.path === path);
        if (error) {
          return { error: true, helperText: error.error };
        }
      }
      return { error: false, helperText: message };
    },
    [errors],
  );

  const validate = useCallback(
    async (params: T) => {
      const result = await validateForm(schema, params);
      if (!result.isValid && result.errors !== undefined) {
        setErrors(result.errors);
        return false;
      }
      setErrors(undefined);
      return true;
    },
    [schema],
  );

  // Push to error bag
  const appendErrors = (err: FormError[]) => setErrors(err);

  return { errors, clearErrors, getErrorProps, validate, appendErrors };
}
