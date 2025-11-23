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
