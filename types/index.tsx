import { Gender, VaccinationStatus, YoN } from './enum';

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
