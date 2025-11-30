import { ValidationError } from 'yup';

import { DictOf } from '@/types';

import { FormError, Schema, ValidationResult } from '../types/form';

function formatError(errors: ValidationError[]): FormError[] {
  return errors.map((e) => ({
    path: e.path,
    error: e.errors[0],
  }));
}

export async function validateForm<T>(
  schema: Schema,
  values: Partial<T>,
): Promise<ValidationResult> {
  try {
    await schema.validate(values, { abortEarly: false, strict: true });
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      errors: formatError((err as ValidationError).inner),
    };
  }
}

/**
 *
 * @param formObject a Record<string, any> that hold form-input data
 * @returns boolean check if all inputs are empty
 */
export const isEmptyFormInputs = (formObject: DictOf<any>) => {
  const arrayOfValues = Object.values(formObject);
  return !arrayOfValues.length || !arrayOfValues.some(Boolean);
};
