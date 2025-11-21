// src/types/enum.ts

export enum YoN {
  Yes = 'Y',
  No = 'N',
}

export enum Eligibility {
  Eligible = 'eligible',
  Refer = 'refer',
}

export enum Gender {
  Male = 'M',
  Female = 'F',
}

export enum AssessmentStep {
  Scan = 1,
  Verify = 2,
  Issue = 3,
}

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
  vaccineStatus: "up-to-date" | "updated-today";
}