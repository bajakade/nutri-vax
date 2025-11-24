export enum REFERRAL_TYPE {
  SAM = 'SAM',
  MAM = 'MAM',
  OTP = 'OTP',
  SC = 'SC',
}

export const FACILITIES = [
  { value: 'nguru-cmam', label: 'Nguru CMAM Center' },
  { value: 'karasuwa-otp', label: 'Karasuwa OTP' },
  { value: 'machina-sc', label: 'Machina Stabilization Center' },
  { value: 'potiskum-hospital', label: 'Potiskum General Hospital' },
] as const;

export const REFERRAL_TYPE_OPTIONS = [
  { value: REFERRAL_TYPE.SAM, label: 'SAM', desc: 'Severe Acute' },
  { value: REFERRAL_TYPE.MAM, label: 'MAM', desc: 'Moderate Acute' },
  { value: REFERRAL_TYPE.OTP, label: 'OTP', desc: 'Outpatient' },
  { value: REFERRAL_TYPE.SC, label: 'SC', desc: 'Stabilization' },
];
