import { ReferralFormData } from './interface';

export interface FormBase {}

export interface LoginForm extends FormBase {
  email?: string;
  username?: string;
  password: string;
  rememberUsername?: boolean;
}

export type FormError = {
  path?: string;
  error: string;
};

export interface SchemaOptions {
  strict?: boolean;
  abortEarly?: boolean;
  stripUnknown?: boolean;
  recursive?: boolean;
}

export interface Schema {
  validate(value: any, options?: SchemaOptions): Promise<any>;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: FormError[];
}

export type IFormValue = string | boolean | undefined;

export type IOption = {
  label: string;
  value: IFormValue;
};

export type ItemType = {
  id?: string;
  key?: string;
  name: string;
};

export type UpdateReferralForm = <K extends keyof ReferralFormData>(
  key: K,
  value: ReferralFormData[K],
) => void;

export type ChildInformationSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
  successSurface: string;
  successColor: string;
};
