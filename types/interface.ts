import { Gender, ReferralType, VaccinationStatus, YoN } from './enum';
import { ItemType } from './form';

export interface User {
  id: string;
  username: string;
  email: string;
  facility: ItemType;
  token: string;
}

export interface EnrollmentAttributes {
  name: string;
  sex: Gender;
  age: string;
  refNumber: string;
  immunizationNumber: string;
  muac: string;
  oedema: YoN;
  zScore: YoN;
  settlement?: string;
}

export interface Child {
  name: string;
  serial: string;
  photo: string;
  age: number;
  muac: number;
  visits: number;
  lastVisit: string;
  vaccineStatus: VaccinationStatus;
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
  referralType: ReferralType;
  reason: string;
  signature: string;
}

export interface Response {
  ok: boolean;
  error?: Error;
}

export type DictOf<T> = Record<string, T>;
