import { ReferralType } from '@/types';

export const FACILITIES = [
  { value: 'nguru-cmam', label: 'Nguru CMAM Center' },
  { value: 'karasuwa-otp', label: 'Karasuwa OTP' },
  { value: 'machina-sc', label: 'Machina Stabilization Center' },
  { value: 'potiskum-hospital', label: 'Potiskum General Hospital' },
] as const;

export const REFERRAL_TYPE_OPTIONS = [
  { value: ReferralType.SAM, label: 'SAM', desc: 'Severe Acute' },
  { value: ReferralType.MAM, label: 'MAM', desc: 'Moderate Acute' },
  { value: ReferralType.OTP, label: 'OTP', desc: 'Outpatient' },
  { value: ReferralType.SC, label: 'SC', desc: 'Stabilization' },
];
