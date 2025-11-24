import { Gender, VaccinationStatus, YoN } from './enum';

import { REFERRAL_TYPE } from '@/constants/referral';

export interface ChildData {
  name: string;
  sex: Gender;
  dob: string;
  immunizationNumber: string;
  muac: string;
  oedema: YoN;
  zScore: YoN;
  settlement?: string;
}

export interface Child {
  id: string;
  name: string;
  serial: string;
  photo: string;
  age: number;
  muac: number;
  visits: number;
  lastVisit: string;
  vaccineStatus: VaccinationStatus;
}
export interface Vaccine {
  id: string;
  name: string;
  dueAgeMonths: number;
  status: VaccinationStatus;
}

export interface ReferralFormData {
  childName: string;
  immunizationNumber: string;
  age: string;
  sex: Gender;
  muac: string;
  settlement: string;
  fromFacility: string;
  toFacility: string;
  referralType: REFERRAL_TYPE;
  reason: string;
  signature: string;
}

export type Response = {ok: boolean; error?: Error};
