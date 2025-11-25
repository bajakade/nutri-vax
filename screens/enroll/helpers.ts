/* eslint-disable quotes */
import { z } from 'zod';

import { MAX_AGE_MONTHS, MIN_AGE_MONTHS, MIN_MUAC_MM } from '@/constants/assessment';
import { calculateAgeInMonths } from '@/helpers/age';
import { Eligibility, Gender, YoN } from '@/types/enum';

export const childEnrollmentSchema = z
  .object({
    name: z.string().trim().min(1, 'Child name is required'),
    sex: z.nativeEnum(Gender, { message: "Select the child's sex" }),
    dob: z
      .string()
      .trim()
      .min(1, 'Date of birth is required')
      .refine((value) => !Number.isNaN(new Date(value).valueOf()), {
        message: 'Enter a valid date (YYYY-MM-DD)',
      }),
    immunizationNumber: z.string().trim().min(1, 'Immunization number is required'),
    muac: z
      .string()
      .trim()
      .min(1, 'MUAC is required')
      .refine((value) => !Number.isNaN(Number(value)), {
        message: 'MUAC must be a number',
      }),
    oedema: z.nativeEnum(YoN, { message: 'Select oedema status' }),
    zScore: z.nativeEnum(YoN, { message: 'Select z-score status' }),
  })
  .superRefine((data, ctx) => {
    const age = calculateAgeInMonths(data.dob);
    if (!Number.isFinite(age)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid date (YYYY-MM-DD)',
        path: ['dob'],
      });
    } else {
      if (age < MIN_AGE_MONTHS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Child must be at least ${MIN_AGE_MONTHS} months old`,
          path: ['dob'],
        });
      }
      if (age > MAX_AGE_MONTHS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Child must be ${MAX_AGE_MONTHS} months old or younger`,
          path: ['dob'],
        });
      }
    }

    const muacValue = Number(data.muac);
    if (Number.isFinite(muacValue) && muacValue < MIN_MUAC_MM) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `MUAC must be at least ${MIN_MUAC_MM} mm`,
        path: ['muac'],
      });
    }
  });

export type ChildFormValues = z.infer<typeof childEnrollmentSchema>;

export const defaultFormValues: ChildFormValues = {
  name: '',
  sex: Gender.Male,
  dob: '',
  immunizationNumber: '',
  muac: '',
  oedema: YoN.No,
  zScore: YoN.Yes,
};

export const determineEligibility = (values: ChildFormValues): Eligibility => {
  const age = calculateAgeInMonths(values.dob);
  const muac = Number(values.muac) || 0;
  const isEligible =
    Number.isFinite(age) &&
    age >= MIN_AGE_MONTHS &&
    age <= MAX_AGE_MONTHS &&
    muac >= MIN_MUAC_MM &&
    values.oedema === YoN.No &&
    values.zScore === YoN.Yes;

  return isEligible ? Eligibility.Eligible : Eligibility.Refer;
};

export type DobPickerState = {
  visible: boolean;
  date: Date;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export const formatDateToISO = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseISODateString = (value: string): Date | null => {
  const [year, month, day] = value.split('-').map((part) => Number.parseInt(part, 10));
  if (!year || !month || !day) {
    return null;
  }
  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateForDisplay = (value: string) => {
  const date = parseISODateString(value);
  return date ? date.toLocaleDateString() : value;
};

export const startOfDay = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const subtractMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};

export const clampDate = (date: Date, min: Date, max: Date) => {
  if (date.getTime() < min.getTime()) {
    return min;
  }
  if (date.getTime() > max.getTime()) {
    return max;
  }
  return date;
};
