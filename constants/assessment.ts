import { Gender, YoN } from '@/types';

export const MIN_AGE_MONTHS = 6;
export const MAX_AGE_MONTHS = 23;

// MUAC in mm (≥ 115 mm = not acutely malnourished)
export const MIN_MUAC_MM = 115;

/**
 * MUAC thresholds (mm) used across the app.
 *
 * - NORMAL: >= 125 mm (no acute malnutrition)
 * - MODERATE: >= 115 mm and <125 mm (moderate acute malnutrition)
 * - SEVERE: < 115 mm (severe acute malnutrition)
 */
export enum MUAC_THRESHOLDS {
  NORMAL = 125,
  MODERATE = 115,
}

// Barcode format
export const BARCODE_PREFIX = 'NVX';
export const BARCODE_YEAR = new Date().getFullYear();

export const YoNOptions = [
  {
    label: 'Yes',
    value: YoN.Yes,
  },
  {
    label: 'No',
    value: YoN.No,
  },
];

export const GenderOptions = [
  {
    label: 'Male',
    value: Gender.Male,
  },
  {
    label: 'Female',
    value: Gender.Female,
  },
];
